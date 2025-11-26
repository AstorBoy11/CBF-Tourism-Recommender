# 🧪 Quick Start: Testing

## Setup (One-time)

1. **Buat Test Database**
   ```powershell
   # Login ke MySQL
   C:\xampp\mysql\bin\mysql.exe -u root
   
   # Buat database
   CREATE DATABASE db_cbf_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   EXIT;
   ```

2. **Import Schema**
   ```powershell
   Get-Content C:\Users\USER\Downloads\db_cbf.sql | C:\xampp\mysql\bin\mysql.exe -u root db_cbf_test
   ```

3. **Install Dependencies** (jika belum)
   ```bash
   npm install
   ```

## Run Tests

### 🚀 Quick Test (Recommended)
```bash
npm run test:api
```

### 📊 All Tests + Coverage
```bash
npm run test:coverage
```

### 🔄 Watch Mode (Development)
```bash
npm run test:api:watch
```

### 🎯 E2E Tests Only
```bash
npm run test:e2e
```

### 📝 Specific Test File
```bash
npm run test:api -- auth.test.js
```

## Expected Output

```bash
PASS  __tests__/api/mysql-helpers.test.js
  MySQL Helper Functions
    ✓ generateUUID() (12ms)
    ✓ parseJsonField() (5ms)
    ✓ formatDestination() (8ms)

PASS  __tests__/api/auth.test.js
  Authentication API
    ✓ should register new user (234ms)
    ✓ should login successfully (123ms)
    ✓ should verify JWT token (45ms)

PASS  __tests__/api/destinations.test.js
  Destinations API
    ✓ should fetch destinations (156ms)
    ✓ should filter by category (98ms)

PASS  __tests__/api/recommendations.test.js
  Recommendations API
    ✓ should generate recommendations (345ms)

PASS  __tests__/e2e/user-flow.test.js
  E2E: Complete User Flow
    ✓ should complete user journey (2456ms)

Test Suites: 5 passed, 5 total
Tests:       45 passed, 45 total
Time:        12.456s
```

## Troubleshooting

### ❌ MySQL Connection Failed
```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Fix:** Start XAMPP MySQL
```powershell
# Check if MySQL running
Get-Process | Where-Object {$_.ProcessName -like "*mysql*"}
```

### ❌ Database Not Found
```bash
Error: Unknown database 'db_cbf_test'
```
**Fix:** Create the database (see Setup step 1)

### ❌ Module Not Found
```bash
Cannot find module '@/lib/mysql'
```
**Fix:** Check jest.config.api.js exists

## Test Coverage

Current coverage untuk backend API:
- **Authentication:** 95%
- **Destinations:** 90%
- **Recommendations:** 85%
- **MySQL Helpers:** 98%

## 📚 More Info

Lihat dokumentasi lengkap: [docs/TESTING.md](./docs/TESTING.md)
