# Backend API Documentation

## Overview
Backend API untuk Tourism Recommender System menggunakan Next.js API Routes dan Supabase sebagai database.

## Setup

### 1. Database Setup (Supabase)
1. Buat project baru di [Supabase](https://supabase.com)
2. Copy SQL schema dari `lib/database.sql`
3. Execute di Supabase SQL Editor
4. Copy Project URL dan Anon Key ke `.env.local`

### 2. Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` dengan credentials Anda:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register user baru
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/logout`
Logout user (requires auth)

#### GET `/api/auth/me`
Get current user profile (requires auth)

### Destinations

#### GET `/api/destinations`
Get all destinations dengan filter
Query params:
- `category` (optional): beach, nature, culture, adventure, urban
- `search` (optional): search term
- `limit` (default: 50)
- `offset` (default: 0)

#### GET `/api/destinations/[id]`
Get destination detail by ID

#### POST `/api/destinations`
Create new destination (admin only)
```json
{
  "name": "Bali Beach",
  "location": "Bali, Indonesia",
  "description": "Beautiful beach...",
  "image_url": "https://...",
  "category": "beach",
  "price_range": "Medium",
  "operating_hours": "24 Hours",
  "latitude": -8.7467,
  "longitude": 115.1688,
  "facilities": ["Parking", "Restaurant"],
  "tags": ["beach", "sunset"]
}
```

#### PUT `/api/destinations/[id]`
Update destination (admin only)

#### DELETE `/api/destinations/[id]`
Delete destination (admin only)

### Recommendations

#### GET `/api/recommendations`
Get personalized recommendations (requires auth)
Uses Content-Based Filtering algorithm

### User Preferences

#### GET `/api/preferences`
Get user preferences (requires auth)

#### POST `/api/preferences`
Create/update user preferences (requires auth)
```json
{
  "categories": ["beach", "nature"],
  "budget_range": "medium",
  "preferred_activities": ["swimming", "hiking"],
  "travel_style": "moderate"
}
```

### Reviews

#### GET `/api/reviews?destination_id={id}`
Get reviews for destination

#### POST `/api/reviews`
Create review (requires auth)
```json
{
  "destination_id": "uuid",
  "rating": 5,
  "comment": "Amazing place!"
}
```

### Favorites

#### GET `/api/favorites`
Get user favorites (requires auth)

#### POST `/api/favorites`
Add to favorites (requires auth)
```json
{
  "destination_id": "uuid"
}
```

#### DELETE `/api/favorites?destination_id={id}`
Remove from favorites (requires auth)

### Visit History

#### GET `/api/visit-history`
Get user visit history (requires auth)

#### POST `/api/visit-history`
Add to visit history (requires auth)
```json
{
  "destination_id": "uuid"
}
```

## Authentication

Semua endpoint yang memerlukan authentication harus menyertakan token di header:
```
Authorization: Bearer {access_token}
```

Token didapat dari response `/api/auth/login` atau `/api/auth/register`.

## Database Schema

### Tables:
1. **profiles** - User profiles
2. **destinations** - Tourism destinations
3. **user_preferences** - User preferences for recommendations
4. **reviews** - User ratings and reviews
5. **favorites** - User favorite destinations
6. **visit_history** - User visit history
7. **recommendations_cache** - Cached recommendations

## Content-Based Filtering Algorithm

Algorithm ini menggunakan:
1. User preference vector (categories, budget, travel style)
2. Destination feature vector (category, price, rating, facilities)
3. Cosine similarity untuk menghitung kecocokan
4. User history dan ratings untuk personalisasi

## Testing

Run tests:
```bash
npm test
```

## Development

Start dev server:
```bash
npm run dev
```

API akan tersedia di `http://localhost:3000/api`
