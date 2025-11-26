// __tests__/api/auth.test.js
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { query } from '../../lib/mysql.js'
import { registerUser, loginUser, verifyToken } from '../../lib/auth.js'

describe('Authentication API', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Test123456',
    full_name: 'Test User',
  }

  let userId = null
  let authToken = null

  beforeAll(async () => {
    // Clean up test user if exists
    await query('DELETE FROM profiles WHERE email = ?', [testUser.email])
  })

  afterAll(async () => {
    // Clean up test data
    if (userId) {
      await query('DELETE FROM profiles WHERE id = ?', [userId])
    }
  })

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const result = await registerUser(
        testUser.email,
        testUser.password,
        testUser.full_name
      )

      expect(result.error).toBeNull()
      expect(result.user).toBeDefined()
      expect(result.user.email).toBe(testUser.email)
      expect(result.user.full_name).toBe(testUser.full_name)
      expect(result.token).toBeDefined()

      userId = result.user.id
      authToken = result.token
    })

    it('should not register user with duplicate email', async () => {
      const result = await registerUser(
        testUser.email,
        testUser.password,
        testUser.full_name
      )

      expect(result.error).toBeDefined()
      expect(result.error).toContain('already exists')
    })

    it('should validate email format', async () => {
      const result = await registerUser(
        'invalid-email',
        testUser.password,
        testUser.full_name
      )

      expect(result.error).toBeDefined()
    })

    it('should validate password length', async () => {
      const result = await registerUser(
        'newuser@example.com',
        '123',
        'New User'
      )

      expect(result.error).toBeDefined()
      expect(result.error).toContain('6 characters')
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login with correct credentials', async () => {
      const result = await loginUser(testUser.email, testUser.password)

      expect(result.error).toBeNull()
      expect(result.user).toBeDefined()
      expect(result.user.email).toBe(testUser.email)
      expect(result.token).toBeDefined()
    })

    it('should not login with wrong password', async () => {
      const result = await loginUser(testUser.email, 'WrongPassword123')

      expect(result.error).toBeDefined()
      expect(result.error).toContain('Invalid')
    })

    it('should not login with non-existent email', async () => {
      const result = await loginUser('notexist@example.com', testUser.password)

      expect(result.error).toBeDefined()
    })
  })

  describe('JWT Token Verification', () => {
    it('should verify valid token', async () => {
      const result = await verifyToken(authToken)

      expect(result.error).toBeNull()
      expect(result.decoded).toBeDefined()
      expect(result.decoded.userId).toBe(userId)
    })

    it('should reject invalid token', async () => {
      const result = await verifyToken('invalid.token.here')

      expect(result.error).toBeDefined()
    })

    it('should reject expired token', async () => {
      // Create a token that expires immediately
      const jwt = await import('jsonwebtoken')
      const expiredToken = jwt.default.sign(
        { userId: userId },
        process.env.JWT_SECRET,
        { expiresIn: '0s' }
      )

      // Wait a moment for it to expire
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await verifyToken(expiredToken)
      expect(result.error).toBeDefined()
    })
  })
})
