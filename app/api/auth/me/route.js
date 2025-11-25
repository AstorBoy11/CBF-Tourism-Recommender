// app/api/auth/me/route.js
import { getUserFromRequest } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { user, error } = await getUserFromRequest(request)

    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
