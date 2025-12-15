import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';

// GET - Ambil preferensi user
export async function GET(request: NextRequest) {
  try {
    // Ambil token dari header
    const authHeader = request.headers.get('authorization');
    const token = AuthService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan' },
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
    
    // Ambil preferensi user
    const preferences = await prisma.preference.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      count: preferences.length,
      data: preferences
    });
    
  } catch (error) {
    console.error('Get preferences error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data preferensi' },
      { status: 500 }
    );
  }
}

// POST - Buat preferensi baru
export async function POST(request: NextRequest) {
  try {
    // Ambil token dari header
    const authHeader = request.headers.get('authorization');
    const token = AuthService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan' },
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
    
    const body = await request.json();
    const { kategori, budget, durasi, lokasi } = body;
    
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
    
    // Validasi budget
    const validBudgets = ['murah', 'sedang', 'mahal'];
    if (!validBudgets.includes(budget.toLowerCase())) {
      return NextResponse.json(
        { error: 'Budget harus salah satu dari: murah, sedang, mahal' },
        { status: 400 }
      );
    }
    
    // Validasi durasi
    const validDurasi = ['singkat', 'menengah', 'panjang'];
    if (!validDurasi.includes(durasi.toLowerCase())) {
      return NextResponse.json(
        { error: 'Durasi harus salah satu dari: singkat, menengah, panjang' },
        { status: 400 }
      );
    }
    
    // Buat preferensi baru
    const preference = await prisma.preference.create({
      data: {
        userId: payload.userId,
        kategori: Array.isArray(kategori) ? kategori.join(',') : kategori,
        budget: budget.toLowerCase(),
        durasi: durasi.toLowerCase(),
        lokasi: lokasi || null
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Preferensi berhasil disimpan',
      data: preference
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create preference error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan preferensi' },
      { status: 500 }
    );
  }
}
