// app/api/favorites/route.js
import { query, formatDestination } from '@/lib/mysql'
import { getUserFromRequest } from '@/lib/auth'
import { NextResponse } from 'next/server'

// GET - Get user's favorite destinations
export async function GET(request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await query(
      `SELECT d.* FROM favorites f
       JOIN destinations d ON f.destination_id = d.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [user.id]
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    const favorites = result.data.map(dest => formatDestination(dest))

    return NextResponse.json({ favorites })
  } catch (error) {
    console.error('Get favorites error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Add destination to favorites
export async function POST(request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { destination_id } = await request.json()

    if (!destination_id) {
      return NextResponse.json(
        { error: 'Destination ID is required' },
        { status: 400 }
      )
    }

    const result = await query(
      'INSERT INTO favorites (user_id, destination_id) VALUES (?, ?)',
      [user.id, destination_id]
    )

    if (result.error) {
      // Check for duplicate error
      if (result.error.includes('Duplicate')) {
        return NextResponse.json(
          { error: 'Destination already in favorites' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Added to favorites',
    }, { status: 201 })
  } catch (error) {
    console.error('Add favorite error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Remove destination from favorites
export async function DELETE(request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const destinationId = searchParams.get('destination_id')

    if (!destinationId) {
      return NextResponse.json(
        { error: 'Destination ID is required' },
        { status: 400 }
      )
    }

    const result = await query(
      'DELETE FROM favorites WHERE user_id = ? AND destination_id = ?',
      [user.id, destinationId]
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Removed from favorites',
    })
  } catch (error) {
    console.error('Remove favorite error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
