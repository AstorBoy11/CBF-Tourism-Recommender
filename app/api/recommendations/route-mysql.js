// app/api/recommendations/route.js
import { query, queryOne, formatDestination, formatPreferences } from '@/lib/mysql'
import { getUserFromRequest } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { calculateCosineSimilarity } from '@/utils/cosineSimilarity'

// GET - Get personalized recommendations for user
export async function GET(request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check cache first
    const cacheResult = await queryOne(
      'SELECT * FROM recommendations_cache WHERE user_id = ? AND expires_at > NOW()',
      [user.id]
    )

    if (cacheResult.data) {
      return NextResponse.json({
        recommendations: JSON.parse(cacheResult.data.recommendations),
        cached: true,
      })
    }

    // Get user preferences
    const prefsResult = await queryOne(
      'SELECT * FROM user_preferences WHERE user_id = ?',
      [user.id]
    )

    const preferences = prefsResult.data ? formatPreferences(prefsResult.data) : null

    // Get user's visit history
    const historyResult = await query(
      'SELECT destination_id FROM visit_history WHERE user_id = ?',
      [user.id]
    )

    const visitedIds = (historyResult.data || []).map(h => h.destination_id)

    // Get user's ratings
    const ratingsResult = await query(
      'SELECT destination_id, rating FROM reviews WHERE user_id = ?',
      [user.id]
    )

    const userRatings = {}
    if (ratingsResult.data) {
      ratingsResult.data.forEach(r => {
        userRatings[r.destination_id] = r.rating
      })
    }

    // Get all destinations
    const destResult = await query(
      'SELECT * FROM destinations WHERE is_active = 1'
    )

    if (destResult.error || !destResult.data) {
      return NextResponse.json(
        { error: 'Failed to fetch destinations' },
        { status: 500 }
      )
    }

    const destinations = destResult.data.map(formatDestination)

    // Calculate recommendations using Content-Based Filtering
    const recommendations = await calculateRecommendations(
      destinations,
      preferences,
      visitedIds,
      userRatings
    )

    // Cache recommendations for 1 hour
    const cacheExpiry = new Date()
    cacheExpiry.setHours(cacheExpiry.getHours() + 1)

    await query(
      'INSERT INTO recommendations_cache (user_id, recommendations, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE recommendations = ?, expires_at = ?',
      [user.id, JSON.stringify(recommendations), cacheExpiry, JSON.stringify(recommendations), cacheExpiry]
    )

    return NextResponse.json({
      recommendations,
      cached: false,
    })
  } catch (error) {
    console.error('Get recommendations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Calculate recommendations using Content-Based Filtering
async function calculateRecommendations(destinations, preferences, visitedIds, userRatings) {
  const scoredDestinations = destinations.map(dest => {
    let score = 0

    // Skip already visited destinations
    if (visitedIds.includes(dest.id)) {
      return { ...dest, score: -1 }
    }

    // Category preference match (30%)
    if (preferences?.favorite_categories?.includes(dest.category)) {
      score += 0.3
    }

    // Budget range match (20%)
    if (preferences?.budget_range === dest.price_range) {
      score += 0.2
    }

    // Activity preferences match (20%)
    if (preferences?.preferred_activities && dest.tags) {
      const matchingActivities = dest.tags.filter(tag =>
        preferences.preferred_activities.includes(tag)
      )
      score += (matchingActivities.length / Math.max(dest.tags.length, 1)) * 0.2
    }

    // Rating boost (30%)
    score += (dest.rating / 5) * 0.3

    return { ...dest, score }
  })

  // Filter out visited and sort by score
  return scoredDestinations
    .filter(d => d.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20) // Return top 20 recommendations
}
