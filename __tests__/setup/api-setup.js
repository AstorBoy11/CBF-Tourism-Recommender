// __tests__/setup/api-setup.js
import { jest } from '@jest/globals'

// Set test environment variables
process.env.DB_HOST = 'localhost'
process.env.DB_PORT = '3306'
process.env.DB_USER = 'root'
process.env.DB_PASSWORD = ''
process.env.DB_NAME = 'db_cbf_test'
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only'
process.env.JWT_EXPIRES_IN = '1h'

// Mock console to reduce noise in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
}

// Global test timeout
jest.setTimeout(30000)
