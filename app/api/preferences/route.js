// app/api/preferences/route.js
import { query, queryOne, formatPreferences } from '@/lib/mysql'
import { getUserFromRequest } from '@/lib/auth'
import { NextResponse } from 'next/server'

// GET - Get user preferences
export async function GET(request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await queryOne(
      'SELECT * FROM user_preferences WHERE user_id = ?',
      [user.id]
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    const preferences = result.data 
      ? formatPreferences(result.data)
      : {
          favorite_categories: [],
          budget_range: 'medium',
          preferred_activities: [],
          travel_style: 'moderate',
        }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error('Get preferences error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST/PUT - Create or update user preferences
export async function POST(request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { favorite_categories, budget_range, preferred_activities, travel_style } = body

    // Check if preferences exist
    const existing = await queryOne(
      'SELECT id FROM user_preferences WHERE user_id = ?',
      [user.id]
    )

    let result
    if (existing.data) {
      result = await query(
        `UPDATE user_preferences 
         SET favorite_categories = ?, budget_range = ?, preferred_activities = ?, travel_style = ?, updated_at = NOW()
         WHERE user_id = ?`,
        [
          JSON.stringify(favorite_categories || []),
          budget_range || 'medium',
          JSON.stringify(preferred_activities || []),
          travel_style || 'moderate',
          user.id
        ]
      )
    } else {
      result = await query(
        `INSERT INTO user_preferences (user_id, favorite_categories, budget_range, preferred_activities, travel_style)
         VALUES (?, ?, ?, ?, ?)`,
        [
          user.id,
          JSON.stringify(favorite_categories || []),
          budget_range || 'medium',
          JSON.stringify(preferred_activities || []),
          travel_style || 'moderate'
        ]
      )
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    // Invalidate recommendations cache
    await query('DELETE FROM recommendations_cache WHERE user_id = ?', [user.id])

    // Fetch updated preferences
    const updated = await queryOne(
      'SELECT * FROM user_preferences WHERE user_id = ?',
      [user.id]
    )

    return NextResponse.json({
      success: true,
      preferences: formatPreferences(updated.data),
    })
  } catch (error) {
    console.error('Update preferences error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
