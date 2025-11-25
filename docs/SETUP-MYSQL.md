# Backend Setup Guide - MySQL Version

## Database Setup

### 1. Import Database Schema

```bash
# Login ke MySQL
mysql -u root -p

# Create database
CREATE DATABASE db_cbf;

# Import schema
mysql -u root -p db_cbf < path/to/db_cbf.sql
```

Atau gunakan phpMyAdmin untuk import file `db_cbf.sql`.

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=db_cbf
JWT_SECRET=your-secret-key-min-32-characters-long
```

### 3. Install Dependencies

```bash
npm install mysql2 bcryptjs jsonwebtoken
```

## Database Schema Overview

### Tables:
1. **profiles** - User profiles dan authentication
2. **destinations** - Tourism destinations dengan detail lengkap
3. **user_preferences** - User preferences untuk recommendations
4. **reviews** - User ratings dan reviews (dengan auto-update triggers)
5. **favorites** - User favorite destinations
6. **visit_history** - User visit history
7. **itineraries** - Trip planning
8. **itinerary_items** - Items dalam itinerary
9. **notifications** - User notifications
10. **search_history** - Search history tracking
11. **review_helpful** - Review helpfulness tracking
12. **recommendations_cache** - Cached recommendations

### Key Features:
- ✅ UUID primary keys
- ✅ JSON fields untuk data kompleks
- ✅ Database triggers untuk auto-update ratings
- ✅ Comprehensive indexing
- ✅ Foreign key constraints
- ✅ ENUM types untuk validation

## API Endpoints

### Authentication (JWT-based)

#### POST `/api/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```
Response:
```json
{
  "success": true,
  "user": {...},
  "token": "jwt-token-here"
}
```

#### POST `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Headers:
```
Authorization: Bearer <token>
```

### Destinations

#### GET `/api/destinations`
Query params:
- `category`: beach, nature, culture, adventure, urban
- `search`: search term
- `limit`: results per page (default: 50)
- `offset`: pagination offset

#### GET `/api/destinations/[id]`
Get single destination dengan reviews

#### POST `/api/destinations`
Create new destination (requires auth)

### Recommendations

#### GET `/api/recommendations`
Headers: `Authorization: Bearer <token>`

Returns personalized recommendations based on:
- User preferences
- Visit history
- Review ratings
- Content-Based Filtering algorithm

### User Preferences

#### GET `/api/preferences`
#### POST `/api/preferences`

```json
{
  "favorite_categories": ["beach", "nature"],
  "budget_range": "moderate",
  "preferred_activities": ["swimming", "hiking"],
  "travel_style": "adventure",
  "preferred_distance": 100
}
```

### Reviews

#### GET `/api/reviews?destination_id={id}`
#### POST `/api/reviews`

```json
{
  "destination_id": "uuid",
  "rating": 5,
  "title": "Amazing place!",
  "comment": "Highly recommended...",
  "visit_date": "2025-11-20"
}
```

### Favorites & Visit History

#### GET `/api/favorites`
#### POST `/api/favorites`
#### DELETE `/api/favorites?destination_id={id}`

#### GET `/api/visit-history`
#### POST `/api/visit-history`

## Content-Based Filtering Algorithm

### User Vector Components:
1. Favorite categories (one-hot encoded)
2. Budget range preference
3. Travel style preference
4. Average rating given
5. Activity preferences

### Destination Vector Components:
1. Category (one-hot encoded)
2. Price range
3. Activity level
4. Rating score
5. Facilities count

### Similarity Calculation:
Uses **Cosine Similarity** to match user preferences with destination features.

## Testing

### Test Database Connection:
```bash
npm run dev

# Test API
curl http://localhost:3000/api/destinations
```

### Register Test User:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","fullName":"Test User"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

Save the returned `token` for authenticated requests.

### Get Recommendations:
```bash
curl http://localhost:3000/api/recommendations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Security Notes

1. **JWT_SECRET**: Gunakan string random minimal 32 karakter
2. **Password Hashing**: Menggunakan bcrypt dengan salt rounds 10
3. **SQL Injection Prevention**: Menggunakan prepared statements
4. **CORS**: Configure di `next.config.js` jika diperlukan

## Database Triggers

Database ini memiliki triggers otomatis untuk:
- Update rating dan review_count saat review ditambah/diubah/dihapus
- Update helpful_count saat review marked as helpful

## Performance Tips

1. **Indexing**: Sudah ada indexes pada:
   - category, rating, location
   - user_id, destination_id
   - created_at, updated_at

2. **Connection Pooling**: MySQL2 pool sudah dikonfigurasi dengan limit 10 connections

3. **Caching**: Recommendations di-cache selama 1 jam

## Troubleshooting

### Error: ER_NOT_SUPPORTED_AUTH_MODE
```bash
# Di MySQL console:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Error: Cannot connect to MySQL
- Check MySQL service running
- Verify DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env.local
- Check firewall settings

### Error: Table doesn't exist
- Re-import db_cbf.sql
- Check database name matches DB_NAME in .env.local
