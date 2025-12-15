import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Hash password untuk demo user
  const password = await bcrypt.hash('password123', 10);

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'test@mail.dev' },
    update: {},
    create: {
      email: 'test@mail.dev',
      name: 'Demo User',
      password: password,
    },
  });

  console.log('Demo user created:', user.email);

  // Create sample destinations
  const destinations = [
    {
      nama: 'Pantai Pulau Merah',
      deskripsi: 'Pantai indah dengan pasir merah dan ombak yang cocok untuk surfing. Tempat yang sempurna untuk menikmati sunset dan olahraga air.',
      lokasi: 'Pesanggaran',
      kategori: 'pantai,outdoor',
      rating: 4.5,
      tags: 'pantai,surfing,pemandangan,alam,sunset',
      harga: 10000,
      durasi: 4,
      fasilitas: 'toilet,warung,parkir,penyewaan papan',
    },
    {
      nama: 'Kawah Ijen',
      deskripsi: 'Kawah dengan fenomena blue fire yang terkenal dan danau belerang berwarna hijau tosca. Pendakian dimulai dini hari untuk menyaksikan api biru yang menakjubkan.',
      lokasi: 'Licin',
      kategori: 'gunung,outdoor,alam',
      rating: 5.0,
      tags: 'gunung,pendakian,blue fire,alam,petualangan',
      harga: 100000,
      durasi: 8,
      fasilitas: 'guide,pos pendakian,masker gas,toilet',
    },
    {
      nama: 'De Djawatan Forest',
      deskripsi: 'Hutan tropis dengan pohon-pohon tua yang menjulang tinggi menciptakan suasana mistis. Spot foto Instagram-able dengan akar pohon yang unik.',
      lokasi: 'Benculuk',
      kategori: 'alam,outdoor',
      rating: 4.3,
      tags: 'hutan,fotografi,alam,pohon,wisata keluarga',
      harga: 5000,
      durasi: 2,
      fasilitas: 'parkir,toilet,spot foto,gazebo',
    },
    {
      nama: 'Pantai Sukamade',
      deskripsi: 'Pantai konservasi penyu dengan kesempatan melihat penyu bertelur di malam hari. Pengalaman yang mendidik tentang pelestarian satwa langka.',
      lokasi: 'Pesanggaran',
      kategori: 'pantai,outdoor,alam',
      rating: 4.8,
      tags: 'pantai,penyu,konservasi,alam,edukasi',
      harga: 200000,
      durasi: 12,
      fasilitas: 'guide,penginapan,dokumentasi,toilet',
    },
    {
      nama: 'Taman Nasional Baluran',
      deskripsi: 'Taman nasional dengan savana seperti di Afrika. Habitat berbagai satwa liar termasuk banteng, rusa, dan burung langka. Cocok untuk safari foto.',
      lokasi: 'Baluran',
      kategori: 'alam,outdoor',
      rating: 4.7,
      tags: 'savana,wildlife,fotografi,alam,safari',
      harga: 75000,
      durasi: 5,
      fasilitas: 'guide,viewing point,parkir,toilet',
    },
    {
      nama: 'Pantai Bangsring',
      deskripsi: 'Pantai dengan underwater spot untuk snorkeling. Terumbu karang yang masih bagus dan ikan-ikan berwarna-warni. Cocok untuk keluarga.',
      lokasi: 'Wongsorejo',
      kategori: 'pantai,outdoor',
      rating: 4.4,
      tags: 'pantai,snorkeling,underwater,alam,keluarga',
      harga: 50000,
      durasi: 4,
      fasilitas: 'peralatan snorkeling,toilet,warung,parkir',
    },
    {
      nama: 'Air Terjun Lider',
      deskripsi: 'Air terjun tersembunyi di tengah hutan dengan kolam alami yang jernih. Suasana sejuk dan asri, cocok untuk berenang dan bersantai.',
      lokasi: 'Licin',
      kategori: 'alam,outdoor',
      rating: 4.2,
      tags: 'air terjun,alam,berenang,hutan,petualangan',
      harga: 15000,
      durasi: 3,
      fasilitas: 'parkir,warung,gazebo,toilet',
    },
    {
      nama: 'Plengkung (G-Land)',
      deskripsi: 'Surga bagi para peselancar dengan ombak kelas dunia. Salah satu spot surfing terbaik di dunia dengan barrel yang sempurna.',
      lokasi: 'Pesanggaran',
      kategori: 'pantai,outdoor',
      rating: 4.9,
      tags: 'pantai,surfing,ombak,petualangan,ekstrim',
      harga: 250000,
      durasi: 16,
      fasilitas: 'penginapan,penyewaan papan,guide,restoran',
    },
    {
      nama: 'Watu Dodol',
      deskripsi: 'Tebing dengan pemandangan laut lepas yang menakjubkan. Tempat yang pas untuk melihat sunrise dan merasakan semilir angin laut.',
      lokasi: 'Banyuwangi Kota',
      kategori: 'alam,outdoor',
      rating: 4.0,
      tags: 'tebing,pemandangan,sunrise,fotografi,pantai',
      harga: 5000,
      durasi: 2,
      fasilitas: 'parkir,warung,toilet,spot foto',
    },
    {
      nama: 'Pantai Mustika',
      deskripsi: 'Pantai dengan pasir putih dan air laut yang jernih. Suasana tenang, cocok untuk bersantai dan bermain air bersama keluarga.',
      lokasi: 'Pesanggaran',
      kategori: 'pantai,outdoor',
      rating: 4.1,
      tags: 'pantai,pasir putih,keluarga,santai,berenang',
      harga: 10000,
      durasi: 3,
      fasilitas: 'toilet,warung,parkir,gazebo',
    },
  ];

  for (const dest of destinations) {
    const existing = await prisma.destinasi.findFirst({
      where: { nama: dest.nama }
    });
    
    if (!existing) {
      const created = await prisma.destinasi.create({
        data: dest,
      });
      console.log('Destination created:', created.nama);
    } else {
      console.log('⏭Destination already exists:', dest.nama);
    }
  }

  console.log('Seeding completed!');
  console.log('\nDemo Account:');
  console.log('   Email: test@mail.dev');
  console.log('   Password: password123');
  console.log(`\nCreated ${destinations.length} sample destinations`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
