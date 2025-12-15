import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { CBFRecommender } from '@/lib/cbf';
import type { DestinasiItem, UserPreference } from '@/lib/cbf';

// POST - Generate rekomendasi berdasarkan preferensi
export async function POST(request: NextRequest) {
  try {
    // Ambil token dari header (opsional, bisa anonymous)
    const authHeader = request.headers.get('authorization');
    const token = AuthService.extractTokenFromHeader(authHeader);
    
    let userId: string | null = null;
    if (token) {
      const payload = AuthService.verifyToken(token);
      if (payload) {
        userId = payload.userId;
      }
    }
    
    const body = await request.json();
    const { kategori, budget, durasi, lokasi, limit } = body;
    
    // Validasi input
    if (!kategori || !budget || !durasi) {
      return NextResponse.json(
        { error: 'Kategori, budget, dan durasi harus diisi' },
        { status: 400 }
      );
    }
    
    // Validasi kategori adalah array
    if (!Array.isArray(kategori)) {
      return NextResponse.json(
        { error: 'Kategori harus berupa array' },
        { status: 400 }
      );
    }
    
    // Ambil semua destinasi dari database
    const allDestinasi = await prisma.destinasi.findMany();
    
    if (allDestinasi.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Belum ada data destinasi',
        data: []
      });
    }
    
    // Convert ke format DestinasiItem
    const destinasiItems: DestinasiItem[] = allDestinasi.map((dest: any) => ({
      id: dest.id,
      nama: dest.nama,
      deskripsi: dest.deskripsi,
      kategori: dest.kategori,
      lokasi: dest.lokasi,
      harga: dest.harga,
      durasi: dest.durasi,
      fasilitas: dest.fasilitas
    }));
    
    // Create user preference object
    const userPreference: UserPreference = {
      kategori,
      budget: budget.toLowerCase(),
      durasi: durasi.toLowerCase(),
      lokasi: lokasi || undefined
    };
    
    // Simpan preferensi jika user sudah login
    if (userId) {
      await prisma.preference.create({
        data: {
          userId,
          kategori: Array.isArray(kategori) ? kategori.join(',') : kategori,
          budget: budget.toLowerCase(),
          durasi: durasi.toLowerCase(),
          lokasi: lokasi || null
        }
      });
    }
    
    // Generate recommendations menggunakan CBF
    const recommender = new CBFRecommender();
    const recommendations = recommender.recommend(
      userPreference,
      destinasiItems,
      limit || 10
    );
    
    // Ambil detail lengkap destinasi dari database
    const recommendationIds = recommendations.map(rec => rec.destinasi.id);
    const fullDestinasi = await prisma.destinasi.findMany({
      where: {
        id: {
          in: recommendationIds
        }
      }
    });
    
    // Gabungkan dengan score dan matched features
    const result = recommendations.map(rec => {
      const fullDest = fullDestinasi.find((d: any) => d.id === rec.destinasi.id);
      return {
        ...fullDest,
        score: rec.score,
        matchedFeatures: rec.matchedFeatures
      };
    });
    
    return NextResponse.json({
      success: true,
      count: result.length,
      preference: userPreference,
      data: result
    });
    
  } catch (error) {
    console.error('Generate recommendations error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat generate rekomendasi' },
      { status: 500 }
    );
  }
}

// GET - Ambil rekomendasi berdasarkan preferensi terakhir user
export async function GET(request: NextRequest) {
  try {
    // Ambil token dari header
    const authHeader = request.headers.get('authorization');
    const token = AuthService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan. Gunakan POST untuk rekomendasi tanpa login' },
        { status: 401 }
      );
    }
    
    // Verify token
    const payload = AuthService.verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 401 }
      );
    }
    
    // Ambil preferensi terakhir user
    const lastPreference = await prisma.preference.findFirst({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' }
    });
    
    if (!lastPreference) {
      return NextResponse.json(
        { error: 'Belum ada preferensi. Silakan buat preferensi terlebih dahulu' },
        { status: 404 }
      );
    }
    
    // Ambil semua destinasi
    const allDestinasi = await prisma.destinasi.findMany();
    
    if (allDestinasi.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Belum ada data destinasi',
        data: []
      });
    }
    
    // Convert ke format DestinasiItem
    const destinasiItems: DestinasiItem[] = allDestinasi.map((dest: any) => ({
      id: dest.id,
      nama: dest.nama,
      deskripsi: dest.deskripsi,
      kategori: dest.kategori,
      lokasi: dest.lokasi,
      harga: dest.harga,
      durasi: dest.durasi,
      fasilitas: dest.fasilitas
    }));
    
    // Create user preference object
    const userPreference: UserPreference = {
      kategori: lastPreference.kategori,
      budget: lastPreference.budget,
      durasi: lastPreference.durasi,
      lokasi: lastPreference.lokasi || undefined
    };
    
    // Generate recommendations
    const recommender = new CBFRecommender();
    const recommendations = recommender.recommend(
      userPreference,
      destinasiItems,
      10
    );
    
    // Ambil detail lengkap destinasi
    const recommendationIds = recommendations.map(rec => rec.destinasi.id);
    const fullDestinasi = await prisma.destinasi.findMany({
      where: {
        id: {
          in: recommendationIds
        }
      }
    });
    
    // Gabungkan dengan score dan matched features
    const result = recommendations.map(rec => {
      const fullDest = fullDestinasi.find((d: any) => d.id === rec.destinasi.id);
      return {
        ...fullDest,
        score: rec.score,
        matchedFeatures: rec.matchedFeatures
      };
    });
    
    return NextResponse.json({
      success: true,
      count: result.length,
      preference: userPreference,
      data: result
    });
    
  } catch (error) {
    console.error('Get recommendations error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil rekomendasi' },
      { status: 500 }
    );
  }
}
