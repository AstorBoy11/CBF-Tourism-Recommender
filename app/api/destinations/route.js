// app/api/destinations/route.js
import { query, generateUUID, formatDestination } from '@/lib/mysql'
import { NextResponse } from 'next/server'

// GET - Fetch all destinations with optional filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let sql = 'SELECT * FROM destinations WHERE is_active = 1'
    const params = []

    // Apply category filter
    if (category && category !== 'all') {
      sql += ' AND category = ?'
      params.push(category)
    }

    // Apply search filter
    if (search) {
      sql += ' AND (name LIKE ? OR location LIKE ? OR description LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    // Add ordering and pagination (LIMIT/OFFSET can't be parameterized in MySQL)
    sql += ` ORDER BY rating DESC, review_count DESC LIMIT ${limit} OFFSET ${offset}`

    const { data, error } = await query(sql, params)

    if (error) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      )
    }

    // Format destinations
    const destinations = data.map(formatDestination)

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM destinations WHERE is_active = 1'
    const countParams = []
    
    if (category && category !== 'all') {
      countSql += ' AND category = ?'
      countParams.push(category)
    }
    
    if (search) {
      countSql += ' AND (name LIKE ? OR location LIKE ? OR description LIKE ?)'
      const searchTerm = `%${search}%`
      countParams.push(searchTerm, searchTerm, searchTerm)
    }

    const { data: countData } = await query(countSql, countParams)
    const total = countData[0]?.total || 0

    return NextResponse.json({
      destinations,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Get destinations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new destination
export async function POST(request) {
  try {
    const body = await request.json()
    const {
      name,
      location,
      description,
      image_url,
      category,
      price_range,
      operating_hours,
      latitude,
      longitude,
      facilities,
      tags,
    } = body

    if (!name || !location || !category) {
      return NextResponse.json(
        { error: 'Name, location, and category are required' },
        { status: 400 }
      )
    }

    const id = generateUUID()
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const { error } = await query(
      `INSERT INTO destinations (
        id, name, slug, location, description, image_url, category, 
        price_range, operating_hours, latitude, longitude, facilities, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, name, slug, location, description, image_url, category,
        price_range, JSON.stringify(operating_hours), latitude, longitude,
        JSON.stringify(facilities || []), JSON.stringify(tags || [])
      ]
    )

    if (error) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      )
    }

    // Get created destination
    const { data } = await query('SELECT * FROM destinations WHERE id = ?', [id])
    const destination = data && data.length > 0 ? formatDestination(data[0]) : null

    return NextResponse.json({
      success: true,
      destination,
    }, { status: 201 })
  } catch (error) {
    console.error('Create destination error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
