// lib/auth.js - Authentication helpers for MySQL
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query, queryOne, generateUUID } from './mysql'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// Register new user
export async function registerUser(email, password, fullName) {
  try {
    // Check if user exists
    const { data: existingUser } = await queryOne(
      'SELECT id FROM profiles WHERE email = ?',
      [email]
    )

    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = generateUUID()

    // Insert user
    const { error } = await query(
      'INSERT INTO profiles (id, email, full_name) VALUES (?, ?, ?)',
      [userId, email, fullName]
    )

    if (error) {
      return { success: false, error: 'Failed to create user' }
    }

    // Store password hash separately (you might want to add a passwords table)
    // For now, we'll assume authentication is handled externally or you add a password field

    // Generate JWT token
    const token = jwt.sign(
      { userId, email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    // Get user profile
    const { data: user } = await queryOne(
      'SELECT id, email, full_name, avatar_url, phone_number, created_at FROM profiles WHERE id = ?',
      [userId]
    )

    return {
      success: true,
      user,
      token,
    }
  } catch (error) {
    console.error('Register error:', error)
    return { success: false, error: error.message }
  }
}

// Login user
export async function loginUser(email, password) {
  try {
    // Get user (including password hash if you add that field)
    const { data: user } = await queryOne(
      'SELECT id, email, full_name, avatar_url FROM profiles WHERE email = ? AND is_active = 1',
      [email]
    )

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    // TODO: Verify password with bcrypt.compare() when you have password storage
    // For now, we'll generate token directly
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return {
      success: true,
      user,
      token,
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: error.message }
  }
}

// Verify JWT token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { valid: true, payload: decoded }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

// Get user from request
export async function getUserFromRequest(request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, error: 'No authorization token' }
    }

    const token = authHeader.substring(7)
    const { valid, payload, error } = verifyToken(token)

    if (!valid) {
      return { user: null, error: error || 'Invalid token' }
    }

    // Get user from database
    const { data: user } = await queryOne(
      'SELECT id, email, full_name, avatar_url, phone_number, date_of_birth, bio, is_active FROM profiles WHERE id = ? AND is_active = 1',
      [payload.userId]
    )

    if (!user) {
      return { user: null, error: 'User not found' }
    }

    return { user, error: null }
  } catch (error) {
    console.error('Get user error:', error)
    return { user: null, error: error.message }
  }
}

// Middleware to require authentication
export function requireAuth(handler) {
  return async (request, context) => {
    const { user, error } = await getUserFromRequest(request)

    if (error || !user) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Add user to request context
    request.user = user
    return handler(request, context)
  }
}
