// app/api/reviews/route.js
import { query, generateUUID } from '@/lib/mysql'
import { getUserFromRequest } from '@/lib/auth'
import { NextResponse } from 'next/server'

// GET - Get reviews for a destination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const destinationId = searchParams.get('destination_id')

    if (!destinationId) {
      return NextResponse.json(
        { error: 'Destination ID is required' },
        { status: 400 }
      )
    }

    const result = await query(
      `SELECT r.*, p.full_name, p.avatar_url
       FROM reviews r
       JOIN profiles p ON r.user_id = p.id
       WHERE r.destination_id = ?
       ORDER BY r.created_at DESC`,
      [destinationId]
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ reviews: result.data })
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new review
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
    const { destination_id, rating, comment } = body

    if (!destination_id || !rating) {
      return NextResponse.json(
        { error: 'Destination ID and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if review exists
    const existing = await query(
      'SELECT id FROM reviews WHERE user_id = ? AND destination_id = ?',
      [user.id, destination_id]
    )

    let result
    if (existing.data && existing.data.length > 0) {
      // Update existing review
      result = await query(
        'UPDATE reviews SET rating = ?, comment = ?, updated_at = NOW() WHERE user_id = ? AND destination_id = ?',
        [rating, comment, user.id, destination_id]
      )
    } else {
      // Insert new review
      const reviewId = generateUUID()
      result = await query(
        'INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
        [reviewId, user.id, destination_id, rating, comment]
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

    // Fetch created/updated review
    const reviewResult = await query(
      'SELECT r.*, p.full_name, p.avatar_url FROM reviews r JOIN profiles p ON r.user_id = p.id WHERE r.user_id = ? AND r.destination_id = ?',
      [user.id, destination_id]
    )

    return NextResponse.json({
      success: true,
      review: reviewResult.data[0],
    }, { status: 201 })
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
