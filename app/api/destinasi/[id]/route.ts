import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Ambil destinasi berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const destinasi = await prisma.destinasi.findUnique({
      where: { id }
    });
    
    if (!destinasi) {
      return NextResponse.json(
        { error: 'Destinasi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: destinasi
    });
    
  } catch (error) {
    console.error('Get destinasi by ID error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data destinasi' },
      { status: 500 }
    );
  }
}

// PUT - Update destinasi
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Cek apakah destinasi exists
    const existingDestinasi = await prisma.destinasi.findUnique({
      where: { id }
    });
    
    if (!existingDestinasi) {
      return NextResponse.json(
        { error: 'Destinasi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Update destinasi
    const destinasi = await prisma.destinasi.update({
      where: { id },
      data: body
    });
    
    return NextResponse.json({
      success: true,
      message: 'Destinasi berhasil diupdate',
      data: destinasi
    });
    
  } catch (error) {
    console.error('Update destinasi error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengupdate destinasi' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus destinasi
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Cek apakah destinasi exists
    const existingDestinasi = await prisma.destinasi.findUnique({
      where: { id }
    });
    
    if (!existingDestinasi) {
      return NextResponse.json(
        { error: 'Destinasi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Hapus destinasi
    await prisma.destinasi.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Destinasi berhasil dihapus'
    });
    
  } catch (error) {
    console.error('Delete destinasi error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus destinasi' },
      { status: 500 }
    );
  }
}
