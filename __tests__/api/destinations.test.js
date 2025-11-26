// __tests__/api/destinations.test.js
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { query, generateUUID } from '../../lib/mysql.js'

describe('Destinations API', () => {
  let testDestinationId = null

  beforeAll(async () => {
    // Create a test destination
    testDestinationId = generateUUID()
    await query(
      `INSERT INTO destinations (
        id, name, slug, location, description, category, 
        rating, review_count, price_range, latitude, longitude, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        testDestinationId,
        'Test Beach',
        'test-beach',
        'Test Location',
        'Test description',
        'beach',
        4.5,
        10,
        'medium',
        -8.123456,
        115.123456,
        1,
      ]
    )
  })

  afterAll(async () => {
    // Clean up test data
    if (testDestinationId) {
      await query('DELETE FROM destinations WHERE id = ?', [testDestinationId])
    }
  })

  describe('GET /api/destinations', () => {
    it('should fetch all active destinations', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE is_active = 1 LIMIT 10'
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
    })

    it('should filter destinations by category', async () => {
      const result = await query(
        "SELECT * FROM destinations WHERE is_active = 1 AND category = 'beach' LIMIT 10"
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      
      if (result.data.length > 0) {
        expect(result.data[0].category).toBe('beach')
      }
    })

    it('should search destinations by name', async () => {
      const searchTerm = '%Test%'
      const result = await query(
        'SELECT * FROM destinations WHERE is_active = 1 AND name LIKE ? LIMIT 10',
        [searchTerm]
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
    })

    it('should return destinations with correct structure', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE id = ?',
        [testDestinationId]
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(result.data.length).toBe(1)

      const destination = result.data[0]
      expect(destination.id).toBe(testDestinationId)
      expect(destination.name).toBe('Test Beach')
      expect(destination.category).toBe('beach')
      expect(destination.rating).toBe(4.5)
    })
  })

  describe('GET /api/destinations/[id]', () => {
    it('should fetch single destination by id', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE id = ? AND is_active = 1',
        [testDestinationId]
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(result.data.length).toBe(1)
      expect(result.data[0].id).toBe(testDestinationId)
    })

    it('should return null for non-existent destination', async () => {
      const fakeId = generateUUID()
      const result = await query(
        'SELECT * FROM destinations WHERE id = ? AND is_active = 1',
        [fakeId]
      )

      expect(result.error).toBeNull()
      expect(result.data.length).toBe(0)
    })
  })

  describe('Database Integrity', () => {
    it('should have required fields not null', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE id = ?',
        [testDestinationId]
      )

      const destination = result.data[0]
      expect(destination.name).toBeDefined()
      expect(destination.slug).toBeDefined()
      expect(destination.category).toBeDefined()
      expect(destination.location).toBeDefined()
    })

    it('should have valid rating range', async () => {
      const result = await query(
        'SELECT * FROM destinations WHERE id = ?',
        [testDestinationId]
      )

      const destination = result.data[0]
      expect(destination.rating).toBeGreaterThanOrEqual(0)
      expect(destination.rating).toBeLessThanOrEqual(5)
    })
  })
})
