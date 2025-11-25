// app/api/auth/login/route.js
import { loginUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await loginUser(email, password)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
