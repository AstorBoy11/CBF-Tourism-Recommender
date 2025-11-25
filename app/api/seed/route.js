// app/api/seed/route.js - Endpoint untuk seed sample data
import { query } from '@/lib/mysql'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Check if destinations already exist
    const countResult = await query('SELECT COUNT(*) as count FROM destinations')

    if (countResult.error) {
      return NextResponse.json(
        { error: 'Failed to check database' },
        { status: 500 }
      )
    }

    const count = countResult.data[0].count

    if (count > 0) {
      return NextResponse.json({
        message: 'Database already contains destinations',
        count,
      })
    }

    return NextResponse.json({
      message: 'Seed functionality available - please import SQL file directly',
      hint: 'Run: Get-Content C:\\Users\\USER\\Downloads\\db_cbf.sql | C:\\xampp\\mysql\\bin\\mysql.exe -u root db_cbf',
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
