// jest.config.api.js - Configuration for API tests
export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/api/**/*.test.js'],
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/api-setup.js'],
  collectCoverageFrom: [
    'app/api/**/*.js',
    'lib/**/*.js',
    '!**/*.test.js',
  ],
}
