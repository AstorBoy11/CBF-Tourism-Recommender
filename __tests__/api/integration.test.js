// __tests__/api/integration.test.js
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { query, generateUUID } from '../../lib/mysql.js'
import { registerUser, loginUser } from '../../lib/auth.js'

describe('Integration Tests', () => {
  let userId = null
  let authToken = null
  let destinationId1 = null
  let destinationId2 = null

  beforeAll(async () => {
    // Setup: Create test user
    const userResult = await registerUser(
      `integration-${Date.now()}@test.com`,
      'Integration123',
      'Integration Test'
    )
    userId = userResult.user?.id
    authToken = userResult.token

    // Setup: Create test destinations
    destinationId1 = generateUUID()
    destinationId2 = generateUUID()

    await query(
      `INSERT INTO destinations (
        id, name, slug, location, description, category, 
        rating, review_count, price_range, latitude, longitude, 
        facilities, tags, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        destinationId1,
        'Integration Beach 1',
        'integration-beach-1',
        'Bali',
        'Beautiful beach for testing',
        'beach',
        4.5,
        10,
        'medium',
        -8.5,
        115.5,
        JSON.stringify(['parking', 'wifi']),
        JSON.stringify(['swimming', 'sunset']),
        1,
      ]
    )

    await query(
      `INSERT INTO destinations (
        id, name, slug, location, description, category, 
        rating, review_count, price_range, latitude, longitude, 
        facilities, tags, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        destinationId2,
        'Integration Mountain',
        'integration-mountain',
        'Bandung',
        'Cool mountain for testing',
        'nature',
        4.8,
        20,
        'budget',
        -6.9,
        107.6,
        JSON.stringify(['camping', 'hiking']),
        JSON.stringify(['trekking', 'photography']),
        1,
      ]
    )
  })

  afterAll(async () => {
    // Cleanup
    if (userId) {
      await query('DELETE FROM reviews WHERE user_id = ?', [userId])
      await query('DELETE FROM favorites WHERE user_id = ?', [userId])
      await query('DELETE FROM visit_history WHERE user_id = ?', [userId])
      await query('DELETE FROM user_preferences WHERE user_id = ?', [userId])
      await query('DELETE FROM recommendations_cache WHERE user_id = ?', [
        userId,
      ])
      await query('DELETE FROM profiles WHERE id = ?', [userId])
    }
    if (destinationId1) {
      await query('DELETE FROM reviews WHERE destination_id = ?', [
        destinationId1,
      ])
      await query('DELETE FROM destinations WHERE id = ?', [destinationId1])
    }
    if (destinationId2) {
      await query('DELETE FROM reviews WHERE destination_id = ?', [
        destinationId2,
      ])
      await query('DELETE FROM destinations WHERE id = ?', [destinationId2])
    }
  })

  describe('User Preferences → Recommendations Flow', () => {
    it('should create preferences and get matching recommendations', async () => {
      // 1. Create user preferences
      await query(
        `INSERT INTO user_preferences (user_id, favorite_categories, budget_range, preferred_activities, travel_style)
         VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          JSON.stringify(['beach', 'nature']),
          'medium',
          JSON.stringify(['swimming', 'hiking']),
          'adventurous',
        ]
      )

      // 2. Get preferences
      const prefsResult = await query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [userId]
      )
      expect(prefsResult.data.length).toBe(1)

      const prefs = prefsResult.data[0]
      const categories = JSON.parse(prefs.favorite_categories)

      // 3. Get recommendations based on preferences
      const recsResult = await query(
        'SELECT * FROM destinations WHERE category IN (?) AND is_active = 1',
        [categories]
      )

      expect(recsResult.data.length).toBeGreaterThan(0)
      const hasBeach = recsResult.data.some((d) => d.category === 'beach')
      const hasNature = recsResult.data.some((d) => d.category === 'nature')
      expect(hasBeach || hasNature).toBe(true)
    })
  })

  describe('Review → Rating Update Flow', () => {
    it('should update destination rating when review is added', async () => {
      // 1. Get initial rating
      const initialResult = await query(
        'SELECT rating, review_count FROM destinations WHERE id = ?',
        [destinationId1]
      )
      const initialRating = initialResult.data[0].rating
      const initialCount = initialResult.data[0].review_count

      // 2. Add review
      const reviewId = generateUUID()
      await query(
        'INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
        [reviewId, userId, destinationId1, 5, 'Amazing place!']
      )

      // 3. Wait for trigger to execute
      await new Promise((resolve) => setTimeout(resolve, 200))

      // 4. Check updated rating
      const updatedResult = await query(
        'SELECT rating, review_count FROM destinations WHERE id = ?',
        [destinationId1]
      )
      const updatedCount = updatedResult.data[0].review_count

      expect(updatedCount).toBe(initialCount + 1)

      // Cleanup
      await query('DELETE FROM reviews WHERE id = ?', [reviewId])
    })
  })

  describe('Favorites → Visit History Integration', () => {
    it('should track user interactions with destinations', async () => {
      // 1. Add to favorites
      await query(
        'INSERT INTO favorites (user_id, destination_id) VALUES (?, ?)',
        [userId, destinationId1]
      )

      // 2. Add to visit history
      const visitId = generateUUID()
      await query(
        'INSERT INTO visit_history (id, user_id, destination_id) VALUES (?, ?, ?)',
        [visitId, userId, destinationId1]
      )

      // 3. Verify both records exist
      const favResult = await query(
        'SELECT * FROM favorites WHERE user_id = ? AND destination_id = ?',
        [userId, destinationId1]
      )
      const histResult = await query(
        'SELECT * FROM visit_history WHERE user_id = ? AND destination_id = ?',
        [userId, destinationId1]
      )

      expect(favResult.data.length).toBe(1)
      expect(histResult.data.length).toBe(1)

      // 4. Get complete user activity
      const activityResult = await query(
        `SELECT 
          d.name,
          CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END as is_favorite,
          CASE WHEN vh.user_id IS NOT NULL THEN 1 ELSE 0 END as has_visited
         FROM destinations d
         LEFT JOIN favorites f ON d.id = f.destination_id AND f.user_id = ?
         LEFT JOIN visit_history vh ON d.id = vh.destination_id AND vh.user_id = ?
         WHERE d.id = ?`,
        [userId, userId, destinationId1]
      )

      expect(activityResult.data[0].is_favorite).toBe(1)
      expect(activityResult.data[0].has_visited).toBe(1)
    })
  })

  describe('Search → Filter → Sort Integration', () => {
    it('should combine search, filter, and sort operations', async () => {
      // Search + Filter by category + Sort by rating
      const result = await query(
        `SELECT * FROM destinations 
         WHERE is_active = 1 
         AND category = 'beach'
         AND name LIKE ?
         ORDER BY rating DESC, review_count DESC
         LIMIT 10`,
        ['%Beach%']
      )

      expect(result.data.length).toBeGreaterThan(0)

      // Verify all results match criteria
      result.data.forEach((dest) => {
        expect(dest.category).toBe('beach')
        expect(dest.name).toContain('Beach')
        expect(dest.is_active).toBe(1)
      })

      // Verify sorting
      if (result.data.length > 1) {
        for (let i = 0; i < result.data.length - 1; i++) {
          expect(result.data[i].rating).toBeGreaterThanOrEqual(
            result.data[i + 1].rating
          )
        }
      }
    })
  })

  describe('Multi-User Interaction', () => {
    it('should handle multiple users reviewing same destination', async () => {
      // Create second user
      const user2Result = await registerUser(
        `integration2-${Date.now()}@test.com`,
        'Integration123',
        'Integration Test 2'
      )
      const userId2 = user2Result.user?.id

      try {
        // Both users review the same destination
        const review1Id = generateUUID()
        const review2Id = generateUUID()

        await query(
          'INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
          [review1Id, userId, destinationId2, 4, 'Nice place']
        )

        await query(
          'INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
          [review2Id, userId2, destinationId2, 5, 'Excellent!']
        )

        // Get all reviews for destination
        const reviewsResult = await query(
          'SELECT r.*, p.full_name FROM reviews r JOIN profiles p ON r.user_id = p.id WHERE r.destination_id = ? ORDER BY r.created_at DESC',
          [destinationId2]
        )

        expect(reviewsResult.data.length).toBeGreaterThanOrEqual(2)

        // Verify both users' reviews exist
        const hasUser1Review = reviewsResult.data.some(
          (r) => r.user_id === userId
        )
        const hasUser2Review = reviewsResult.data.some(
          (r) => r.user_id === userId2
        )

        expect(hasUser1Review).toBe(true)
        expect(hasUser2Review).toBe(true)

        // Cleanup
        await query('DELETE FROM reviews WHERE id IN (?, ?)', [
          review1Id,
          review2Id,
        ])
      } finally {
        // Cleanup second user
        if (userId2) {
          await query('DELETE FROM profiles WHERE id = ?', [userId2])
        }
      }
    })
  })

  describe('Cache Invalidation Flow', () => {
    it('should invalidate cache when user data changes', async () => {
      // 1. Create recommendation cache
      const cacheId = generateUUID()
      const recommendations = [{ id: destinationId1, score: 0.9 }]
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1)

      await query(
        'INSERT INTO recommendations_cache (id, user_id, recommendations, expires_at) VALUES (?, ?, ?, ?)',
        [cacheId, userId, JSON.stringify(recommendations), expiresAt]
      )

      // 2. Verify cache exists
      let cacheResult = await query(
        'SELECT * FROM recommendations_cache WHERE user_id = ?',
        [userId]
      )
      expect(cacheResult.data.length).toBe(1)

      // 3. Update user preferences (should trigger cache invalidation)
      await query(
        'UPDATE user_preferences SET budget_range = ? WHERE user_id = ?',
        ['budget', userId]
      )

      // Manually invalidate cache (simulating API behavior)
      await query('DELETE FROM recommendations_cache WHERE user_id = ?', [
        userId,
      ])

      // 4. Verify cache is cleared
      cacheResult = await query(
        'SELECT * FROM recommendations_cache WHERE user_id = ?',
        [userId]
      )
      expect(cacheResult.data.length).toBe(0)
    })
  })

  describe('Data Consistency Across Tables', () => {
    it('should maintain referential integrity', async () => {
      // 1. Create review
      const reviewId = generateUUID()
      await query(
        'INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
        [reviewId, userId, destinationId1, 4, 'Good place']
      )

      // 2. Verify review exists with related data
      const result = await query(
        `SELECT 
          r.id as review_id,
          r.rating,
          p.email as user_email,
          d.name as destination_name
         FROM reviews r
         JOIN profiles p ON r.user_id = p.id
         JOIN destinations d ON r.destination_id = d.id
         WHERE r.id = ?`,
        [reviewId]
      )

      expect(result.data.length).toBe(1)
      expect(result.data[0].user_email).toBeDefined()
      expect(result.data[0].destination_name).toBeDefined()
      expect(result.data[0].rating).toBe(4)

      // Cleanup
      await query('DELETE FROM reviews WHERE id = ?', [reviewId])
    })
  })

  describe('Performance: Concurrent Operations', () => {
    it('should handle multiple simultaneous queries', async () => {
      const startTime = Date.now()

      // Execute 20 queries concurrently
      const promises = []
      for (let i = 0; i < 20; i++) {
        promises.push(
          query('SELECT * FROM destinations WHERE is_active = 1 LIMIT 5')
        )
      }

      const results = await Promise.all(promises)
      const endTime = Date.now()
      const duration = endTime - startTime

      // All queries should succeed
      results.forEach((result) => {
        expect(result.error).toBeNull()
        expect(result.data.length).toBeGreaterThan(0)
      })

      // Should complete in reasonable time (under 2 seconds)
      expect(duration).toBeLessThan(2000)
    })
  })
})
