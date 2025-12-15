# Quick Start Guide - CBF Tourism Recommender

## 🚀 Getting Started in 3 Steps

### Step 1: Start the Application

The development server is already running at:
**http://localhost:3000**

If it's not running, execute:
```bash
npm run dev
```

---

### Step 2: Set Up Database (First Time Only)

If you haven't set up the database yet:

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

Make sure your `.env` file contains:
```
DATABASE_URL="postgresql://username:password@localhost:5432/tourism_db"
JWT_SECRET="your-secret-key-here"
```

---

### Step 3: Test the Application

Open http://localhost:3000 in your browser

#### **Testing Flow:**

1. **Homepage** (`/`)
   - Click "Start Exploring" button
   
2. **Register an Account** (`/auth`)
   - Toggle to "Register"
   - Enter: Email, Name, Password
   - Click "Register"
   - You'll be automatically logged in and redirected to Dashboard
   
3. **Set Preferences** (`/preferences`)
   - From Dashboard, click "Set Your Preferences"
   - Select categories (e.g., Pantai, Alam, Petualangan)
   - Choose budget (Murah/Sedang/Mahal)
   - Choose duration (Singkat/Menengah/Panjang)
   - Optionally add location
   - Click "Save & Generate Recommendations"
   
4. **View Recommendations** (`/dashboard`)
   - See personalized recommendations based on your preferences
   - Match scores shown as percentages
   - Click any destination card to view details
   
5. **Browse All Destinations** (`/destinasi`)
   - Use search bar to find destinations
   - Filter by category and budget
   - Click any destination for full details
   
6. **Learn About Algorithm** (`/about`)
   - Understand how CBF works
   - See TF-IDF and Cosine Similarity explanations

---

## 📝 Add Sample Destination Data

To test the recommendation system, add destinations via API:

### Method 1: Using Prisma Studio
```bash
npx prisma studio
```
Navigate to http://localhost:5555 and add destinations manually

### Method 2: Using API (Postman/Thunder Client)

**POST** `http://localhost:3000/api/destinasi`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Body:
```json
{
  "nama": "Pantai Pulau Merah",
  "deskripsi": "Pantai indah dengan pasir merah dan ombak yang cocok untuk surfing",
  "lokasi": "Pesanggaran",
  "kategori": "pantai",
  "budget": "murah",
  "durasi": "menengah",
  "rating": 4.5,
  "tags": ["pantai", "surfing", "pemandangan", "alam"],
  "harga": 10000,
  "fasilitas": ["toilet", "warung", "parkir"]
}
```

### Sample Destinations to Add

1. **Kawah Ijen**
```json
{
  "nama": "Kawah Ijen",
  "deskripsi": "Kawah dengan blue fire phenomenon dan danau belerang",
  "lokasi": "Licin",
  "kategori": "gunung",
  "budget": "sedang",
  "durasi": "panjang",
  "rating": 5.0,
  "tags": ["gunung", "pendakian", "blue fire", "alam"],
  "harga": 100000,
  "fasilitas": ["guide", "pos pendakian", "masker gas"]
}
```

2. **De Djawatan Forest**
```json
{
  "nama": "De Djawatan Forest",
  "deskripsi": "Hutan tropis dengan pohon-pohon tua yang menjulang tinggi",
  "lokasi": "Benculuk",
  "kategori": "alam",
  "budget": "murah",
  "durasi": "singkat",
  "rating": 4.3,
  "tags": ["hutan", "fotografi", "alam", "pohon"],
  "harga": 5000,
  "fasilitas": ["parkir", "toilet", "spot foto"]
}
```

3. **Pantai Sukamade**
```json
{
  "nama": "Pantai Sukamade",
  "deskripsi": "Pantai konservasi penyu dengan kesempatan melihat penyu bertelur",
  "lokasi": "Pesanggaran",
  "kategori": "pantai",
  "budget": "mahal",
  "durasi": "panjang",
  "rating": 4.8,
  "tags": ["pantai", "penyu", "konservasi", "alam"],
  "harga": 200000,
  "fasilitas": ["guide", "penginapan", "dokumentasi"]
}
```

4. **Taman Nasional Baluran**
```json
{
  "nama": "Taman Nasional Baluran",
  "deskripsi": "Taman nasional dengan savana Afrika di Indonesia",
  "lokasi": "Baluran",
  "kategori": "alam",
  "budget": "sedang",
  "durasi": "menengah",
  "rating": 4.7,
  "tags": ["savana", "wildlife", "fotografi", "alam"],
  "harga": 75000,
  "fasilitas": ["guide", "viewing point", "parkir"]
}
```

5. **Pantai Bangsring**
```json
{
  "nama": "Pantai Bangsring",
  "deskripsi": "Pantai dengan underwater spot untuk snorkeling",
  "lokasi": "Wongsorejo",
  "kategori": "pantai",
  "budget": "sedang",
  "durasi": "menengah",
  "rating": 4.4,
  "tags": ["pantai", "snorkeling", "underwater", "alam"],
  "harga": 50000,
  "fasilitas": ["peralatan snorkeling", "toilet", "warung"]
}
```

---

## 🧪 Testing the CBF Algorithm

### Test Scenario 1: Beach Lover
**Preferences:**
- Categories: Pantai, Alam
- Budget: Sedang
- Duration: Menengah

**Expected Results:**
- Pantai Bangsring (high score - exact match)
- Pantai Sukamade (medium score - pantai but panjang duration)
- De Djawatan Forest (low score - alam but not pantai)

### Test Scenario 2: Nature Explorer
**Preferences:**
- Categories: Gunung, Alam, Petualangan
- Budget: Sedang
- Duration: Panjang

**Expected Results:**
- Kawah Ijen (high score - gunung + alam + panjang)
- Taman Nasional Baluran (medium score - alam + sedang budget)
- De Djawatan Forest (low score - alam but singkat)

### Test Scenario 3: Budget Traveler
**Preferences:**
- Categories: Pantai, Alam
- Budget: Murah
- Duration: Singkat

**Expected Results:**
- De Djawatan Forest (high score - alam + murah + singkat)
- Pantai Pulau Merah (medium score - pantai + murah but menengah)
- Others excluded due to budget filter

---

## 🔍 Verifying the Algorithm

1. **Check Match Scores:**
   - Green badge (>80%) = Excellent match
   - Blue badge (≤80%) = Good match
   - Higher percentage = better fit to preferences

2. **Test Different User Profiles:**
   - Create multiple accounts
   - Set different preferences for each
   - Compare recommendations
   - Each should get different results!

3. **Verify Filtering:**
   - Set Budget = "murah"
   - Should NOT see expensive destinations
   - Set Duration = "singkat"
   - Should NOT see "panjang" duration destinations

---

## 📊 Monitoring

### Check Logs
The terminal running `npm run dev` will show:
- API requests
- Database queries
- Any errors

### Database Inspection
```bash
npx prisma studio
```
Opens visual database editor at http://localhost:5555

View tables:
- **User**: Registered users
- **Preference**: User preference history
- **Destinasi**: All destinations

---

## 🐛 Common Issues

### Issue 1: "Cannot connect to database"
**Solution:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Run `npx prisma db push`

### Issue 2: "No recommendations shown"
**Solution:**
- Add destinations using the samples above
- Ensure preferences are saved (check Preference table)
- Check browser console for errors

### Issue 3: "Login doesn't work"
**Solution:**
- Check JWT_SECRET in .env
- Clear localStorage: `localStorage.clear()`
- Try registering a new account

### Issue 4: Port 3000 already in use
**Solution:**
```bash
npx kill-port 3000
npm run dev
```

---

## ✅ Checklist

Before testing, ensure:
- [ ] PostgreSQL is running
- [ ] .env file configured
- [ ] `npx prisma generate` executed
- [ ] `npx prisma db push` executed
- [ ] `npm install` completed
- [ ] `npm run dev` running
- [ ] Sample destinations added
- [ ] Browser opened to http://localhost:3000

---

## 📈 Next Actions

1. **Add More Data**
   - Add 10-20 destinations for better testing
   - Vary categories, budgets, and durations

2. **Test Algorithm**
   - Create different user profiles
   - Compare recommendations
   - Verify match scores

3. **UI Testing**
   - Test on mobile device
   - Check all responsive breakpoints
   - Verify navigation works

4. **API Testing**
   - Test all endpoints
   - Verify authentication
   - Check error handling

5. **Deploy** (Optional)
   - Push to GitHub (already done!)
   - Deploy to Vercel
   - Configure production database

---

## 🎓 Understanding Match Scores

The match score percentage represents:
- **90-100%**: Perfect match - destination matches ALL preferences
- **80-89%**: Excellent match - matches most preferences
- **70-79%**: Good match - matches several preferences
- **60-69%**: Fair match - matches some preferences
- **<60%**: Shown only if limited destinations available

Scores are calculated using:
1. **TF-IDF** weights for text features
2. **Cosine Similarity** for vector comparison
3. **Budget & Duration** filters (hard constraints)

---

**Happy Testing! 🎉**

If you encounter any issues, check:
1. Terminal output for errors
2. Browser console (F12)
3. Prisma Studio for database state
4. PROJECT_SUMMARY.md for detailed documentation
