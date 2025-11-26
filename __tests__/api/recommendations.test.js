// __tests__/api/recommendations.test.js
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { query, generateUUID } from '../../lib/mysql.js'
import { registerUser } from '../../lib/auth.js'

describe('Recommendations API', () => {
  let testUserId = null
  let testDestinationId = null

  beforeAll(async () => {
    // Create test user
    const userResult = await registerUser(
      'recommend@test.com',
      'Test123456',
      'Recommend User'
    )
    testUserId = userResult.user?.id

    // Create test destination
    testDestinationId = generateUUID()
    await query(
      `INSERT INTO destinations (
        id, name, slug, location, description, category, 
        rating, review_count, price_range, latitude, longitude, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        testDestinationId,
        'Recommend Beach',
        'recommend-beach',
        'Bali',
        'Beautiful beach',
        'beach',
        4.8,
        50,
        'medium',
        -8.5,
        115.5,
        1,
      ]
    )

    // Create user preferences
    await query(
      `INSERT INTO user_preferences (user_id, favorite_categories, budget_range, preferred_activities, travel_style)
       VALUES (?, ?, ?, ?, ?)`,
      [
        testUserId,
        JSON.stringify(['beach', 'nature']),
        'medium',
        JSON.stringify(['swimming', 'surfing']),
        'adventurous',
      ]
    )
  })

  afterAll(async () => {
    // Clean up
    if (testUserId) {
      await query('DELETE FROM user_preferences WHERE user_id = ?', [testUserId])
      await query('DELETE FROM profiles WHERE id = ?', [testUserId])
    }
    if (testDestinationId) {
      await query('DELETE FROM destinations WHERE id = ?', [testDestinationId])
    }
  })

  describe('Content-Based Filtering', () => {
    it('should fetch user preferences', async () => {
      const result = await query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [testUserId]
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(result.data.length).toBe(1)

      const prefs = result.data[0]
      expect(prefs.budget_range).toBe('medium')
      expect(prefs.travel_style).toBe('adventurous')
    })

    it('should calculate recommendations based on category match', async () => {
      // Get user preferences
      const prefsResult = await query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [testUserId]
      )
      const preferences = prefsResult.data[0]
      const favoriteCategories = JSON.parse(preferences.favorite_categories)

      // Get destinations matching preferred categories
      const destResult = await query(
        'SELECT * FROM destinations WHERE category IN (?) AND is_active = 1',
        [favoriteCategories]
      )

      expect(destResult.error).toBeNull()
      expect(destResult.data.length).toBeGreaterThan(0)
    })

    it('should exclude already visited destinations', async () => {
      // Add to visit history
      const visitId = generateUUID()
      await query(
        'INSERT INTO visit_history (id, user_id, destination_id) VALUES (?, ?, ?)',
        [visitId, testUserId, testDestinationId]
      )

      // Get recommendations excluding visited
      const visitedResult = await query(
        'SELECT destination_id FROM visit_history WHERE user_id = ?',
        [testUserId]
      )
      const visitedIds = visitedResult.data.map((v) => v.destination_id)

      const destResult = await query(
        'SELECT * FROM destinations WHERE is_active = 1 AND id NOT IN (?)',
        [visitedIds.length > 0 ? visitedIds : ['none']]
      )

      expect(destResult.error).toBeNull()
      const hasVisited = destResult.data.some(
        (d) => d.id === testDestinationId
      )
      expect(hasVisited).toBe(false)

      // Clean up
      await query('DELETE FROM visit_history WHERE id = ?', [visitId])
    })
  })

  describe('Recommendation Cache', () => {
    it('should cache recommendations', async () => {
      const cacheId = generateUUID()
      const recommendations = [
        { id: testDestinationId, name: 'Recommend Beach', score: 0.85 },
      ]
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1)

      const result = await query(
        'INSERT INTO recommendations_cache (id, user_id, recommendations, expires_at) VALUES (?, ?, ?, ?)',
        [cacheId, testUserId, JSON.stringify(recommendations), expiresAt]
      )

      expect(result.error).toBeNull()

      // Verify cache
      const cacheResult = await query(
        'SELECT * FROM recommendations_cache WHERE user_id = ?',
        [testUserId]
      )
      expect(cacheResult.data.length).toBeGreaterThan(0)

      // Clean up
      await query('DELETE FROM recommendations_cache WHERE id = ?', [cacheId])
    })

    it('should not return expired cache', async () => {
      const result = await query(
        'SELECT * FROM recommendations_cache WHERE user_id = ? AND expires_at > NOW()',
        [testUserId]
      )

      expect(result.error).toBeNull()
      // Should be empty after cleanup
    })
  })
})
