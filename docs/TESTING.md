# API & E2E Testing Guide

## 📋 Overview

Project ini memiliki 2 jenis testing:
1. **API Testing** - Test untuk endpoint API dan logic backend
2. **E2E Testing** - Test untuk complete user flow dari registrasi hingga rekomendasi

## 🚀 Setup Testing Environment

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Test Database
Buat database MySQL khusus untuk testing:

```sql
CREATE DATABASE db_cbf_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Import schema:
```powershell
Get-Content C:\Users\USER\Downloads\db_cbf.sql | C:\xampp\mysql\bin\mysql.exe -u root db_cbf_test
```

### 3. Environment Variables
Test menggunakan environment variables yang didefinisikan di `__tests__/setup/api-setup.js`:

```javascript
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=db_cbf_test
JWT_SECRET=test-jwt-secret-key-for-testing-only
JWT_EXPIRES_IN=1h
```

## 🧪 Running Tests

### Run All Tests
```bash
npm run test:all
```

### Run API Tests Only
```bash
npm run test:api
```

### Run E2E Tests Only
```bash
npm run test:e2e
```

### Run with Watch Mode
```bash
npm run test:api:watch
```

### Run with Coverage Report
```bash
npm run test:coverage
```

## 📁 Test Structure

```
__tests__/
├── setup/
│   └── api-setup.js          # Test environment configuration
├── api/
│   ├── auth.test.js          # Authentication API tests
│   ├── destinations.test.js  # Destinations API tests
│   └── recommendations.test.js # Recommendations API tests
└── e2e/
    └── user-flow.test.js     # Complete user flow E2E test
```

## 🔍 Test Coverage

### API Tests

#### 1. Authentication Tests (`auth.test.js`)
- ✅ User registration with validation
- ✅ Login with correct/incorrect credentials
- ✅ JWT token generation and verification
- ✅ Token expiration handling
- ✅ Email and password validation

**Example:**
```javascript
describe('POST /api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const result = await registerUser(email, password, full_name)
    expect(result.error).toBeNull()
    expect(result.token).toBeDefined()
  })
})
```

#### 2. Destinations Tests (`destinations.test.js`)
- ✅ Fetch all destinations
- ✅ Filter by category
- ✅ Search by name/location
- ✅ Get single destination by ID
- ✅ Database integrity checks
- ✅ Rating validation

**Example:**
```javascript
describe('GET /api/destinations', () => {
  it('should filter destinations by category', async () => {
    const result = await query(
      "SELECT * FROM destinations WHERE category = 'beach'"
    )
    expect(result.data[0].category).toBe('beach')
  })
})
```

#### 3. Recommendations Tests (`recommendations.test.js`)
- ✅ Content-Based Filtering algorithm
- ✅ User preferences matching
- ✅ Category-based recommendations
- ✅ Exclude visited destinations
- ✅ Recommendation caching
- ✅ Cache expiration

**Example:**
```javascript
describe('Content-Based Filtering', () => {
  it('should exclude already visited destinations', async () => {
    const recommendations = await calculateRecommendations(
      destinations,
      preferences,
      visitedIds
    )
    expect(recommendations.some(d => visitedIds.includes(d.id))).toBe(false)
  })
})
```

### E2E Tests

#### Complete User Flow (`user-flow.test.js`)
Test 10 langkah complete user journey:

1. **Registration & Login**
   - Register new user
   - Login with credentials
   - Fetch user profile

2. **Browse Destinations**
   - Fetch all destinations
   - Search by keyword
   - Filter by category

3. **View Details**
   - Get destination by ID
   - Fetch reviews

4. **Set Preferences**
   - Create user preferences
   - Update preferences

5. **Add to Favorites**
   - Add destination to favorites
   - Fetch user favorites

6. **Write Review**
   - Create review with rating
   - Verify rating update (trigger)

7. **Track Visit History**
   - Add to visit history
   - Fetch history

8. **Get Recommendations**
   - Generate personalized recommendations
   - Cache recommendations
   - Fetch cached recommendations

9. **Remove Favorites**
   - Remove from favorites
   - Verify removal

10. **Data Consistency**
    - Verify all user data consistency

**Example:**
```javascript
describe('E2E: Complete User Flow', () => {
  it('should complete full user journey', async () => {
    // 1. Register
    const user = await registerUser(email, password, name)
    
    // 2. Browse destinations
    const destinations = await query('SELECT * FROM destinations')
    
    // 3. Set preferences
    await query('INSERT INTO user_preferences ...')
    
    // 4. Add to favorites
    await query('INSERT INTO favorites ...')
    
    // 5. Write review
    await query('INSERT INTO reviews ...')
    
    // 6. Get recommendations
    const recommendations = await getRecommendations(user.id)
    
    expect(recommendations.length).toBeGreaterThan(0)
  })
})
```

## 📊 Test Results Example

```bash
PASS  __tests__/api/auth.test.js
  Authentication API
    POST /api/auth/register
      ✓ should register a new user successfully (234ms)
      ✓ should not register user with duplicate email (45ms)
      ✓ should validate email format (12ms)
      ✓ should validate password length (10ms)
    POST /api/auth/login
      ✓ should login with correct credentials (123ms)
      ✓ should not login with wrong password (89ms)
    JWT Token Verification
      ✓ should verify valid token (23ms)
      ✓ should reject invalid token (15ms)

PASS  __tests__/api/destinations.test.js
  Destinations API
    ✓ should fetch all active destinations (156ms)
    ✓ should filter by category (98ms)
    ✓ should search by name (87ms)

PASS  __tests__/e2e/user-flow.test.js
  E2E: Complete User Flow
    ✓ Step 1-10: Complete user journey (2345ms)

Test Suites: 3 passed, 3 total
Tests:       24 passed, 24 total
Time:        8.234s
```

## 🔧 Troubleshooting

### MySQL Connection Error
```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:** Pastikan MySQL server running (XAMPP)
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*mysql*"}
```

### Test Database Not Found
```bash
Error: Unknown database 'db_cbf_test'
```
**Solution:** Buat test database:
```sql
CREATE DATABASE db_cbf_test;
```

### Module Not Found
```bash
Cannot find module '@/lib/mysql'
```
**Solution:** Check `moduleNameMapper` di `jest.config.api.js`

### Token Expiration in Tests
**Solution:** Tests menggunakan token dengan expiry 1 jam (cukup untuk testing)

## 📝 Writing New Tests

### API Test Template
```javascript
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { query } from '../../lib/mysql.js'

describe('Your Feature API', () => {
  let testDataId = null

  beforeAll(async () => {
    // Setup test data
  })

  afterAll(async () => {
    // Cleanup test data
  })

  it('should do something', async () => {
    const result = await query('SELECT ...')
    expect(result.error).toBeNull()
    expect(result.data).toBeDefined()
  })
})
```

### E2E Test Template
```javascript
describe('E2E: Feature Flow', () => {
  it('should complete the flow', async () => {
    // Step 1: Setup
    // Step 2: Action
    // Step 3: Verify
    // Step 4: Cleanup
  })
})
```

## 🎯 Best Practices

1. **Isolation** - Setiap test harus independent
2. **Cleanup** - Selalu cleanup test data di `afterAll`
3. **Descriptive Names** - Gunakan nama test yang jelas
4. **Async/Await** - Gunakan async/await untuk database operations
5. **Error Handling** - Test both success dan error cases
6. **Unique Data** - Gunakan unique identifiers (UUID, timestamp)

## 📈 Coverage Goals

- **Unit Tests:** > 80% coverage
- **API Tests:** > 90% coverage
- **E2E Tests:** Critical user flows

## 🚀 CI/CD Integration

Tambahkan di GitHub Actions:
```yaml
- name: Run Tests
  run: |
    npm run test:all
    npm run test:coverage
```

## 📚 References

- [Jest Documentation](https://jestjs.io/)
- [MySQL2 Documentation](https://github.com/sidorares/node-mysql2)
- [Testing Best Practices](https://testingjavascript.com/)
