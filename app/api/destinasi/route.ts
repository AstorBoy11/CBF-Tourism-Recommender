import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Ambil semua destinasi dengan filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('kategori');
    const lokasi = searchParams.get('lokasi');
    const minHarga = searchParams.get('minHarga');
    const maxHarga = searchParams.get('maxHarga');
    
    // Build filter query
    const where: any = {};
    
    if (kategori) {
      where.kategori = {
        hasSome: kategori.split(',')
      };
    }
    
    if (lokasi) {
      where.lokasi = {
        contains: lokasi,
        mode: 'insensitive'
      };
    }
    
    if (minHarga || maxHarga) {
      where.harga = {};
      if (minHarga) where.harga.gte = parseInt(minHarga);
      if (maxHarga) where.harga.lte = parseInt(maxHarga);
    }
    
    const destinasi = await prisma.destinasi.findMany({
      where,
      orderBy: {
        rating: 'desc'
      }
    });
    
    return NextResponse.json({
      success: true,
      count: destinasi.length,
      data: destinasi
    });
    
  } catch (error) {
    console.error('Get destinasi error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data destinasi' },
      { status: 500 }
    );
  }
}

// POST - Buat destinasi baru (untuk admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nama,
      deskripsi,
      kategori,
      lokasi,
      rating,
      harga,
      durasi,
      fasilitas,
      jamBuka,
      jamTutup,
      imageUrl,
      latitude,
      longitude
    } = body;
    
    // Validasi input
    if (!nama || !deskripsi || !kategori || !lokasi || !harga || !durasi) {
      return NextResponse.json(
        { error: 'Field wajib harus diisi: nama, deskripsi, kategori, lokasi, harga, durasi' },
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
    
    // Buat destinasi baru
    const destinasi = await prisma.destinasi.create({
      data: {
        nama,
        deskripsi,
        kategori,
        lokasi,
        rating: rating || 0,
        harga,
        durasi,
        fasilitas: fasilitas || [],
        jamBuka: jamBuka || null,
        jamTutup: jamTutup || null,
        imageUrl: imageUrl || null,
        latitude: latitude || null,
        longitude: longitude || null
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Destinasi berhasil ditambahkan',
      data: destinasi
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create destinasi error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menambah destinasi' },
      { status: 500 }
    );
  }
}
