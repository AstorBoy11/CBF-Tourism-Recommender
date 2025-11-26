// __tests__/api/mysql-helpers.test.js
import { describe, it, expect } from '@jest/globals'
import {
  query,
  queryOne,
  generateUUID,
  parseJsonField,
  formatDestination,
  formatPreferences,
} from '../../lib/mysql.js'

describe('MySQL Helper Functions', () => {
  describe('generateUUID()', () => {
    it('should generate valid UUID v4', () => {
      const uuid = generateUUID()

      expect(uuid).toBeDefined()
      expect(typeof uuid).toBe('string')
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    })

    it('should generate unique UUIDs', () => {
      const uuid1 = generateUUID()
      const uuid2 = generateUUID()

      expect(uuid1).not.toBe(uuid2)
    })

    it('should generate 1000 unique UUIDs', () => {
      const uuids = new Set()
      for (let i = 0; i < 1000; i++) {
        uuids.add(generateUUID())
      }

      expect(uuids.size).toBe(1000)
    })
  })

  describe('parseJsonField()', () => {
    it('should parse valid JSON string', () => {
      const jsonString = '["beach","mountain","city"]'
      const result = parseJsonField(jsonString)

      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual(['beach', 'mountain', 'city'])
    })

    it('should return original value for non-JSON string', () => {
      const nonJson = 'not a json string'
      const result = parseJsonField(nonJson)

      expect(result).toBe(nonJson)
    })

    it('should handle null value', () => {
      const result = parseJsonField(null)
      expect(result).toBeNull()
    })

    it('should handle undefined value', () => {
      const result = parseJsonField(undefined)
      expect(result).toBeUndefined()
    })

    it('should parse nested JSON objects', () => {
      const jsonString = '{"name":"Test","tags":["tag1","tag2"]}'
      const result = parseJsonField(jsonString)

      expect(typeof result).toBe('object')
      expect(result.name).toBe('Test')
      expect(result.tags).toEqual(['tag1', 'tag2'])
    })
  })

  describe('formatDestination()', () => {
    it('should format destination with JSON fields', () => {
      const rawDestination = {
        id: generateUUID(),
        name: 'Test Beach',
        category: 'beach',
        facilities: '["parking","wifi","restaurant"]',
        tags: '["family-friendly","sunset-view"]',
        operating_hours: '{"open":"08:00","close":"18:00"}',
        rating: 4.5,
      }

      const formatted = formatDestination(rawDestination)

      expect(Array.isArray(formatted.facilities)).toBe(true)
      expect(formatted.facilities).toContain('parking')
      expect(Array.isArray(formatted.tags)).toBe(true)
      expect(formatted.tags).toContain('sunset-view')
      expect(typeof formatted.operating_hours).toBe('object')
      expect(formatted.operating_hours.open).toBe('08:00')
    })

    it('should handle destination without JSON fields', () => {
      const rawDestination = {
        id: generateUUID(),
        name: 'Simple Destination',
        category: 'museum',
        rating: 4.0,
      }

      const formatted = formatDestination(rawDestination)

      expect(formatted.name).toBe('Simple Destination')
      expect(formatted.category).toBe('museum')
    })
  })

  describe('formatPreferences()', () => {
    it('should format user preferences with JSON fields', () => {
      const rawPreferences = {
        user_id: generateUUID(),
        favorite_categories: '["beach","nature"]',
        preferred_activities: '["swimming","hiking"]',
        budget_range: 'medium',
        travel_style: 'adventurous',
      }

      const formatted = formatPreferences(rawPreferences)

      expect(Array.isArray(formatted.favorite_categories)).toBe(true)
      expect(formatted.favorite_categories).toContain('beach')
      expect(Array.isArray(formatted.preferred_activities)).toBe(true)
      expect(formatted.preferred_activities).toContain('swimming')
    })
  })

  describe('query() and queryOne()', () => {
    it('should execute simple SELECT query', async () => {
      const result = await query('SELECT 1 as test')

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data[0].test).toBe(1)
    })

    it('should execute query with parameters', async () => {
      const result = await query('SELECT ? as value', [42])

      expect(result.error).toBeNull()
      expect(result.data[0].value).toBe(42)
    })

    it('should handle query errors gracefully', async () => {
      const result = await query('SELECT * FROM non_existent_table')

      expect(result.error).toBeDefined()
      expect(result.data).toBeNull()
    })

    it('should return single row with queryOne()', async () => {
      const result = await queryOne('SELECT "hello" as message')

      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
      expect(result.data.message).toBe('hello')
    })

    it('should return null for empty result with queryOne()', async () => {
      const result = await queryOne(
        'SELECT * FROM destinations WHERE id = ?',
        ['non-existent-id']
      )

      expect(result.error).toBeNull()
      expect(result.data).toBeNull()
    })
  })

  describe('Database Connection', () => {
    it('should connect to database successfully', async () => {
      const result = await query('SELECT DATABASE() as db')

      expect(result.error).toBeNull()
      expect(result.data[0].db).toBe(process.env.DB_NAME)
    })

    it('should execute multiple queries in sequence', async () => {
      const result1 = await query('SELECT 1 as num')
      const result2 = await query('SELECT 2 as num')
      const result3 = await query('SELECT 3 as num')

      expect(result1.data[0].num).toBe(1)
      expect(result2.data[0].num).toBe(2)
      expect(result3.data[0].num).toBe(3)
    })

    it('should handle concurrent queries', async () => {
      const promises = []
      for (let i = 0; i < 10; i++) {
        promises.push(query(`SELECT ${i} as num`))
      }

      const results = await Promise.all(promises)

      results.forEach((result, index) => {
        expect(result.error).toBeNull()
        expect(result.data[0].num).toBe(index)
      })
    })
  })

  describe('SQL Injection Prevention', () => {
    it('should prevent SQL injection in parameters', async () => {
      const maliciousInput = "'; DROP TABLE destinations; --"
      const result = await query(
        'SELECT * FROM destinations WHERE name = ?',
        [maliciousInput]
      )

      // Should not throw error, just return empty result
      expect(result.error).toBeNull()
      expect(result.data).toBeDefined()
    })

    it('should safely handle special characters', async () => {
      const specialChars = "Test's \"Beach\" & <Restaurant>"
      const result = await query('SELECT ? as value', [specialChars])

      expect(result.error).toBeNull()
      expect(result.data[0].value).toBe(specialChars)
    })
  })

  describe('Data Type Handling', () => {
    it('should handle different data types', async () => {
      const testData = {
        string: 'hello',
        number: 42,
        float: 3.14,
        boolean: true,
        null_value: null,
      }

      const result = await query(
        'SELECT ? as string_val, ? as number_val, ? as float_val, ? as bool_val, ? as null_val',
        [
          testData.string,
          testData.number,
          testData.float,
          testData.boolean,
          testData.null_value,
        ]
      )

      expect(result.data[0].string_val).toBe('hello')
      expect(result.data[0].number_val).toBe(42)
      expect(result.data[0].float_val).toBeCloseTo(3.14)
      expect(result.data[0].bool_val).toBe(1) // MySQL stores boolean as 1/0
      expect(result.data[0].null_val).toBeNull()
    })

    it('should handle Date objects', async () => {
      const testDate = new Date('2025-01-01T00:00:00Z')
      const result = await query('SELECT ? as date_val', [testDate])

      expect(result.error).toBeNull()
      expect(result.data[0].date_val).toBeDefined()
    })

    it('should handle JSON data', async () => {
      const jsonData = JSON.stringify({ name: 'test', value: 123 })
      const result = await query('SELECT ? as json_val', [jsonData])

      expect(result.error).toBeNull()
      const parsed = JSON.parse(result.data[0].json_val)
      expect(parsed.name).toBe('test')
      expect(parsed.value).toBe(123)
    })
  })
})
