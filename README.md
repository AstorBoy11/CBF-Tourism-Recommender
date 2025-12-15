# Sistem Rekomendasi Destinasi Wisata - Content-Based Filtering

Project ini adalah sistem rekomendasi destinasi wisata berbasis **Content-Based Filtering** menggunakan **Next.js**, **Prisma**, dan algoritma **TF-IDF** dengan **Cosine Similarity**.

## 🏗️ Struktur Project

```
cbf-tourist-recommender/
│
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Backend)
│   │   ├── auth/                 # Authentication API
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── destinasi/            # Destinasi CRUD API
│   │   ├── preferences/          # User Preference API
│   │   └── recommendations/      # Recommendation API (CBF)
│   ├── destinasi/                # Halaman Destinasi
│   ├── recommendations/          # Halaman Rekomendasi
│   ├── page.tsx                  # Homepage
│   └── layout.tsx
│
├── components/                   # React Components
│   ├── DestinasiList.tsx        # UI List Destinasi
│   ├── PreferenceForm.tsx       # Form Input Preferensi
│   └── RecommendationPage.tsx   # Halaman Hasil Rekomendasi
│
├── lib/                          # Libraries & Utilities
│   ├── cbf/                      # Algoritma CBF
│   │   ├── tfidf.ts             # TF-IDF Implementation
│   │   ├── cosine-similarity.ts # Cosine Similarity
│   │   ├── recommender.ts       # CBF Recommender System
│   │   └── index.ts
│   ├── prisma.ts                # Prisma Client Instance
│   └── auth.ts                  # Authentication Service
│
├── prisma/
│   └── schema.prisma            # Database Schema
│
└── package.json
```

## 📊 Database Schema

### User
- `id`: String (CUID)
- `email`: String (unique)
- `name`: String (optional)
- `password`: String (hashed)

### Preference
- `userId`: String (foreign key)
- `kategori`: String[] (outdoor, kuliner, budaya, dll)
- `budget`: String (murah, sedang, mahal)
- `durasi`: String (singkat, menengah, panjang)
- `lokasi`: String (optional)

### Destinasi
- `nama`, `deskripsi`, `kategori`: String[]
- `lokasi`: String
- `rating`: Float
- `harga`: Int (rupiah)
- `durasi`: Int (jam)
- `fasilitas`: String[]

## 🤖 Algoritma Content-Based Filtering

### 1. TF-IDF (Term Frequency-Inverse Document Frequency)
Menghitung bobot term dalam dokumen destinasi

### 2. Cosine Similarity
Mengukur kesamaan antara user preference dan destinasi (Range: 0-1)

### 3. Filtering
- Budget: murah ≤50K, sedang 50K-150K, mahal >150K
- Durasi: singkat ≤3 jam, menengah 3-6 jam, panjang >6 jam

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
Buat file `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/tourist_db"
JWT_SECRET="your-secret-key"
```

### 3. Run Migration
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Destinasi
- `GET /api/destinasi` - Get semua destinasi (dengan filter)
- `POST /api/destinasi` - Create destinasi baru
- `GET /api/destinasi/[id]` - Get destinasi by ID
- `PUT /api/destinasi/[id]` - Update destinasi
- `DELETE /api/destinasi/[id]` - Delete destinasi

### Preferences
- `GET /api/preferences` - Get user preferences (requires auth)
- `POST /api/preferences` - Create preference (requires auth)

### Recommendations
- `POST /api/recommendations` - Generate rekomendasi
- `GET /api/recommendations` - Get rekomendasi berdasarkan preferensi terakhir (requires auth)

## 🔧 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Styling**: Tailwind CSS
- **Language**: TypeScript
