// __tests__/e2e/user-flow.test.js
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { query, generateUUID } from '../../lib/mysql.js'
import { registerUser, loginUser } from '../../lib/auth.js'

describe('E2E: Complete User Flow', () => {
  let userId = null
  let authToken = null
  let destinationId = null
  let reviewId = null
  let favoriteId = null

  const testUser = {
    email: `e2e-${Date.now()}@test.com`,
    password: 'E2eTest123456',
    full_name: 'E2E Test User',
  }

  beforeAll(async () => {
    // Create test destination
    destinationId = generateUUID()
    await query(
      `INSERT INTO destinations (
        id, name, slug, location, description, category, 
        rating, review_count, price_range, latitude, longitude, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        destinationId,
        'E2E Test Beach',
        'e2e-test-beach',
        'Test City',
        'Beautiful test beach',
        'beach',
        4.5,
        5,
        'medium',
        -8.0,
        115.0,
        1,
      ]
    )
  })

  afterAll(async () => {
    // Clean up all test data
    if (reviewId) {
      await query('DELETE FROM reviews WHERE id = ?', [reviewId])
    }
    if (favoriteId) {
      await query('DELETE FROM favorites WHERE user_id = ? AND destination_id = ?', [
        userId,
        destinationId,
      ])
    }
    if (userId) {
      await query('DELETE FROM visit_history WHERE user_id = ?', [userId])
      await query('DELETE FROM user_preferences WHERE user_id = ?', [userId])
      await query('DELETE FROM recommendations_cache WHERE user_id = ?', [userId])
      await query('DELETE FROM profiles WHERE id = ?', [userId])
    }
    if (destinationId) {
      await query('DELETE FROM destinations WHERE id = ?', [destinationId])
    }
  })

  describe('Step 1: User Registration and Login', () => {
    it('should register new user', async () => {
      const result = await registerUser(
        testUser.email,
        testUser.password,
        testUser.full_name
      )

      expect(result.error).toBeNull()
      expect(result.user).toBeDefined()
      expect(result.token).toBeDefined()

      userId = result.user.id
      authToken = result.token
    })

    it('should login with registered credentials', async () => {
      const result = await loginUser(testUser.email, testUser.password)

      expect(result.error).toBeNull()
      expect(result.user.email).toBe(testUser.email)
      expect(result.token).toBeDefined()

      authToken = result.token
    })

    it('should fetch user profile', async () => {
      const result = await query('SELECT * FROM profiles WHERE id = ?', [
        userId,
      ])

      expect(result.error).toBeNull()
      expect(result.data[0].email).toBe(testUser.email)
      expect(result.data[0].full_name).toBe(testUser.full_name)
    })
  })

  describe('Step 2: Browse and Search Destinations', () => {
    it('should fetch all destinations', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE is_active = 1 LIMIT 10'
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(result.data.length).toBeGreaterThan(0)
    })

    it('should search destinations by keyword', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE is_active = 1 AND name LIKE ?',
        ['%E2E%']
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBeGreaterThan(0)
      expect(result.data[0].id).toBe(destinationId)
    })

    it('should filter by category', async () => {
      const result = await query(
        "SELECT * FROM destinations WHERE is_active = 1 AND category = 'beach' LIMIT 10"
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBeGreaterThan(0)
    })
  })

  describe('Step 3: View Destination Details', () => {
    it('should fetch destination by id', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE id = ?',
        [destinationId]
      )

      expect(result.error).toBeNull()
      expect(result.data[0].name).toBe('E2E Test Beach')
    })

    it('should fetch destination reviews', async () => {
      const result = await query(
        'SELECT * FROM reviews WHERE destination_id = ?',
        [destinationId]
      )

      expect(result.error).toBeNull()
      // May be empty initially
    })
  })

  describe('Step 4: Set User Preferences', () => {
    it('should create user preferences', async () => {
      const result = await query(
        `INSERT INTO user_preferences (user_id, favorite_categories, budget_range, preferred_activities, travel_style)
         VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          JSON.stringify(['beach', 'nature']),
          'medium',
          JSON.stringify(['swimming', 'snorkeling']),
          'relaxed',
        ]
      )

      expect(result.error).toBeNull()
    })

    it('should fetch user preferences', async () => {
      const result = await query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [userId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBe(1)
      expect(result.data[0].budget_range).toBe('medium')
    })
  })

  describe('Step 5: Add to Favorites', () => {
    it('should add destination to favorites', async () => {
      const result = await query(
        'INSERT INTO favorites (user_id, destination_id) VALUES (?, ?)',
        [userId, destinationId]
      )

      expect(result.error).toBeNull()
    })

    it('should fetch user favorites', async () => {
      const result = await query(
        'SELECT d.* FROM favorites f JOIN destinations d ON f.destination_id = d.id WHERE f.user_id = ?',
        [userId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBe(1)
      expect(result.data[0].id).toBe(destinationId)
    })
  })

  describe('Step 6: Add Review and Rating', () => {
    it('should create a review', async () => {
      reviewId = generateUUID()
      const result = await query(
        'INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
        [
          reviewId,
          userId,
          destinationId,
          5,
          'Amazing beach! Highly recommended for E2E testing.',
        ]
      )

      expect(result.error).toBeNull()
    })

    it('should fetch user reviews', async () => {
      const result = await query(
        'SELECT * FROM reviews WHERE user_id = ?',
        [userId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBe(1)
      expect(result.data[0].rating).toBe(5)
    })

    it('should update destination rating (via trigger)', async () => {
      // Wait for trigger to execute
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await query(
        'SELECT rating, review_count FROM destinations WHERE id = ?',
        [destinationId]
      )

      expect(result.error).toBeNull()
      // Rating should be updated by database trigger
      expect(result.data[0].review_count).toBeGreaterThan(5)
    })
  })

  describe('Step 7: Track Visit History', () => {
    it('should add to visit history', async () => {
      const visitId = generateUUID()
      const result = await query(
        'INSERT INTO visit_history (id, user_id, destination_id) VALUES (?, ?, ?)',
        [visitId, userId, destinationId]
      )

      expect(result.error).toBeNull()
    })

    it('should fetch visit history', async () => {
      const result = await query(
        'SELECT vh.*, d.name FROM visit_history vh JOIN destinations d ON vh.destination_id = d.id WHERE vh.user_id = ? ORDER BY vh.visited_at DESC',
        [userId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBeGreaterThan(0)
    })
  })

  describe('Step 8: Get Personalized Recommendations', () => {
    it('should generate recommendations based on preferences', async () => {
      // Get user preferences
      const prefsResult = await query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [userId]
      )

      expect(prefsResult.error).toBeNull()
      expect(prefsResult.data.length).toBe(1)

      const preferences = prefsResult.data[0]
      const categories = JSON.parse(preferences.favorite_categories)

      // Get recommended destinations
      const result = await query(
        'SELECT * FROM destinations WHERE category IN (?) AND is_active = 1 LIMIT 10',
        [categories]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBeGreaterThan(0)
    })

    it('should cache recommendations', async () => {
      const cacheId = generateUUID()
      const recommendations = [
        { id: destinationId, name: 'E2E Test Beach', score: 0.9 },
      ]
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1)

      const result = await query(
        'INSERT INTO recommendations_cache (id, user_id, recommendations, expires_at) VALUES (?, ?, ?, ?)',
        [cacheId, userId, JSON.stringify(recommendations), expiresAt]
      )

      expect(result.error).toBeNull()
    })

    it('should fetch cached recommendations', async () => {
      const result = await query(
        'SELECT * FROM recommendations_cache WHERE user_id = ? AND expires_at > NOW()',
        [userId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBeGreaterThan(0)
    })
  })

  describe('Step 9: Remove from Favorites', () => {
    it('should remove destination from favorites', async () => {
      const result = await query(
        'DELETE FROM favorites WHERE user_id = ? AND destination_id = ?',
        [userId, destinationId]
      )

      expect(result.error).toBeNull()
    })

    it('should verify removal', async () => {
      const result = await query(
        'SELECT * FROM favorites WHERE user_id = ? AND destination_id = ?',
        [userId, destinationId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBe(0)
    })
  })

  describe('Step 10: Data Consistency Check', () => {
    it('should have consistent user data', async () => {
      const profileResult = await query(
        'SELECT * FROM profiles WHERE id = ?',
        [userId]
      )
      const prefsResult = await query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [userId]
      )
      const reviewsResult = await query(
        'SELECT * FROM reviews WHERE user_id = ?',
        [userId]
      )
      const historyResult = await query(
        'SELECT * FROM visit_history WHERE user_id = ?',
        [userId]
      )

      expect(profileResult.data.length).toBe(1)
      expect(prefsResult.data.length).toBe(1)
      expect(reviewsResult.data.length).toBe(1)
      expect(historyResult.data.length).toBeGreaterThan(0)
    })
  })
})
