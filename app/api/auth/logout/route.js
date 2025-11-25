// app/api/auth/logout/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // With JWT, logout is handled client-side by removing the token
    // You could add token blacklist here if needed

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
