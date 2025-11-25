// lib/seed-data.js - Sample data untuk testing
export const sampleDestinations = [
  {
    name: 'Pantai Kuta',
    location: 'Bali, Indonesia',
    description: 'Pantai terkenal dengan sunset yang indah, ombak cocok untuk surfing, dan kehidupan malam yang ramai. Destinasi populer untuk wisatawan domestik dan mancanegara.',
    image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    category: 'beach',
    rating: 4.5,
    price_range: 'Free',
    operating_hours: '24 Hours',
    latitude: -8.7184,
    longitude: 115.1686,
    facilities: ['Parking', 'Restaurant', 'Beach Club', 'Surfboard Rental', 'Shower'],
    tags: ['surfing', 'sunset', 'nightlife', 'beach'],
  },
  {
    name: 'Gunung Bromo',
    location: 'Jawa Timur, Indonesia',
    description: 'Gunung berapi aktif dengan pemandangan sunrise yang menakjubkan. Terletak di Taman Nasional Bromo Tengger Semeru dengan lautan pasir yang luas.',
    image_url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47',
    category: 'nature',
    rating: 4.8,
    price_range: 'Medium',
    operating_hours: '00:00 - 12:00',
    latitude: -7.9425,
    longitude: 112.9531,
    facilities: ['Viewpoint', 'Parking', 'Horse Rental', 'Jeep Tour', 'Camping Area'],
    tags: ['volcano', 'sunrise', 'hiking', 'mountain'],
  },
  {
    name: 'Candi Borobudur',
    location: 'Magelang, Jawa Tengah',
    description: 'Candi Buddha terbesar di dunia dan situs warisan dunia UNESCO. Arsitektur megah dengan relief yang menceritakan perjalanan Buddha.',
    image_url: 'https://images.unsplash.com/photo-1548016576-148d7d6b7046',
    category: 'culture',
    rating: 4.9,
    price_range: 'Low',
    operating_hours: '06:00 - 17:00',
    latitude: -7.6079,
    longitude: 110.2038,
    facilities: ['Museum', 'Guide Service', 'Restaurant', 'Parking', 'Souvenir Shop'],
    tags: ['temple', 'unesco', 'history', 'buddhist'],
  },
  {
    name: 'Raja Ampat',
    location: 'Papua Barat, Indonesia',
    description: 'Surga bawah laut dengan keanekaragaman hayati tertinggi di dunia. Pulau-pulau karst yang indah dan spot diving terbaik.',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    category: 'adventure',
    rating: 5.0,
    price_range: 'High',
    operating_hours: 'Varies by tour',
    latitude: -0.2315,
    longitude: 130.5194,
    facilities: ['Diving Center', 'Resort', 'Boat Rental', 'Snorkeling Gear'],
    tags: ['diving', 'snorkeling', 'island', 'marine'],
  },
  {
    name: 'Malioboro',
    location: 'Yogyakarta, Indonesia',
    description: 'Jalan utama kota Yogyakarta dengan pusat perbelanjaan, kuliner, dan kebudayaan. Tempat ideal untuk berbelanja batik dan oleh-oleh.',
    image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',
    category: 'urban',
    rating: 4.3,
    price_range: 'Low',
    operating_hours: '09:00 - 22:00',
    latitude: -7.7928,
    longitude: 110.3656,
    facilities: ['Shopping Mall', 'Street Food', 'Hotel', 'ATM', 'Parking'],
    tags: ['shopping', 'culture', 'food', 'batik'],
  },
  {
    name: 'Danau Toba',
    location: 'Sumatera Utara, Indonesia',
    description: 'Danau vulkanik terbesar di Indonesia dengan pulau Samosir di tengahnya. Pemandangan alam yang memukau dan budaya Batak yang kental.',
    image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    category: 'nature',
    rating: 4.7,
    price_range: 'Medium',
    operating_hours: '24 Hours',
    latitude: 2.6845,
    longitude: 98.8756,
    facilities: ['Hotel', 'Restaurant', 'Boat Tour', 'Traditional Village', 'Parking'],
    tags: ['lake', 'island', 'culture', 'scenic'],
  },
  {
    name: 'Taman Mini Indonesia Indah',
    location: 'Jakarta, Indonesia',
    description: 'Taman rekreasi yang menampilkan miniatur kebudayaan Indonesia dari 34 provinsi. Museum, teater, dan berbagai wahana edukatif.',
    image_url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b',
    category: 'culture',
    rating: 4.2,
    price_range: 'Low',
    operating_hours: '07:00 - 22:00',
    latitude: -6.3025,
    longitude: 106.8950,
    facilities: ['Museum', 'Theater', 'Cable Car', 'Playground', 'Food Court'],
    tags: ['education', 'family', 'culture', 'park'],
  },
  {
    name: 'Pantai Pink Komodo',
    location: 'Nusa Tenggara Timur, Indonesia',
    description: 'Pantai dengan pasir berwarna pink yang langka. Bagian dari Taman Nasional Komodo, habitat asli komodo dragon.',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    category: 'beach',
    rating: 4.9,
    price_range: 'High',
    operating_hours: '08:00 - 16:00',
    latitude: -8.5833,
    longitude: 119.4833,
    facilities: ['Tour Guide', 'Boat', 'Snorkeling Equipment', 'Camping'],
    tags: ['pink-sand', 'komodo', 'snorkeling', 'rare'],
  },
]

// Function to seed destinations to Supabase
export async function seedDestinations(supabase) {
  console.log('Seeding destinations...')
  
  const { data, error } = await supabase
    .from('destinations')
    .insert(sampleDestinations)
    .select()

  if (error) {
    console.error('Error seeding destinations:', error)
    return { success: false, error }
  }

  console.log(`Successfully seeded ${data.length} destinations`)
  return { success: true, data }
}

// Function to create sample user preferences
export async function createSamplePreferences(supabase, userId) {
  const samplePrefs = {
    user_id: userId,
    categories: ['beach', 'nature'],
    budget_range: 'medium',
    preferred_activities: ['swimming', 'hiking', 'photography'],
    travel_style: 'moderate',
  }

  const { data, error } = await supabase
    .from('user_preferences')
    .upsert(samplePrefs)
    .select()

  if (error) {
    console.error('Error creating preferences:', error)
    return { success: false, error }
  }

  return { success: true, data }
}
