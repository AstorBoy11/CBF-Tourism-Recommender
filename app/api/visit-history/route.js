// app/api/visit-history/route.js
import { query, generateUUID, formatDestination } from '@/lib/mysql'
import { getUserFromRequest } from '@/lib/auth'
import { NextResponse } from 'next/server'

// GET - Get user's visit history
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
      `SELECT vh.id, vh.visited_at, vh.created_at, d.*
       FROM visit_history vh
       JOIN destinations d ON vh.destination_id = d.id
       WHERE vh.user_id = ?
       ORDER BY vh.visited_at DESC`,
      [user.id]
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ history: result.data })
  } catch (error) {
    console.error('Get visit history error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Add destination to visit history
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

    const historyId = generateUUID()
    const result = await query(
      'INSERT INTO visit_history (id, user_id, destination_id) VALUES (?, ?, ?)',
      [historyId, user.id, destination_id]
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    // Invalidate recommendations cache
    await query('DELETE FROM recommendations_cache WHERE user_id = ?', [user.id])

    return NextResponse.json({
      success: true,
      message: 'Added to visit history',
    }, { status: 201 })
  } catch (error) {
    console.error('Add visit history error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
