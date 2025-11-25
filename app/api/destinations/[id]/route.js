// app/api/destinations/[id]/route.js
import { query, queryOne, formatDestination } from '@/lib/mysql'
import { NextResponse } from 'next/server'

// GET - Fetch single destination by ID
export async function GET(request, { params }) {
  try {
    const { id } = params

    // Get destination
    const destResult = await queryOne(
      'SELECT * FROM destinations WHERE id = ? AND is_active = 1',
      [id]
    )

    if (destResult.error || !destResult.data) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      )
    }

    const destination = formatDestination(destResult.data)

    // Get reviews with user profiles
    const reviewsResult = await query(
      `SELECT r.*, p.full_name, p.avatar_url 
       FROM reviews r 
       JOIN profiles p ON r.user_id = p.id 
       WHERE r.destination_id = ? 
       ORDER BY r.created_at DESC`,
      [id]
    )

    if (!reviewsResult.error && reviewsResult.data) {
      destination.reviews = reviewsResult.data
    }

    return NextResponse.json({ destination })
  } catch (error) {
    console.error('Get destination error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update destination (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Prepare update fields
    const fields = []
    const values = []

    Object.entries(body).forEach(([key, value]) => {
      if (key !== 'id') {
        fields.push(`${key} = ?`)
        // Handle JSON fields
        if (['facilities', 'tags', 'operating_hours'].includes(key)) {
          values.push(JSON.stringify(value))
        } else {
          values.push(value)
        }
      }
    })

    values.push(id) // for WHERE clause

    const updateResult = await query(
      `UPDATE destinations SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    )

    if (updateResult.error) {
      return NextResponse.json(
        { error: updateResult.error },
        { status: 400 }
      )
    }

    // Fetch updated destination
    const destResult = await queryOne('SELECT * FROM destinations WHERE id = ?', [id])
    const destination = formatDestination(destResult.data)

    return NextResponse.json({
      success: true,
      destination,
    })
  } catch (error) {
    console.error('Update destination error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete destination (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const deleteResult = await query(
      'DELETE FROM destinations WHERE id = ?',
      [id]
    )

    if (deleteResult.error) {
      return NextResponse.json(
        { error: deleteResult.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Destination deleted successfully',
    })
  } catch (error) {
    console.error('Delete destination error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
