'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Destinasi {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string[];
  lokasi: string;
  rating: number;
  harga: number;
  durasi: number;
  fasilitas: string[];
  imageUrl?: string;
}

export default function DestinasiList() {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    kategori: '',
    lokasi: '',
    minHarga: '',
    maxHarga: ''
  });

  useEffect(() => {
    fetchDestinasi();
  }, []);

  const fetchDestinasi = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filter.kategori) params.append('kategori', filter.kategori);
      if (filter.lokasi) params.append('lokasi', filter.lokasi);
      if (filter.minHarga) params.append('minHarga', filter.minHarga);
      if (filter.maxHarga) params.append('maxHarga', filter.maxHarga);
      
      const response = await fetch(`/api/destinasi?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setDestinasi(data.data);
      } else {
        setError('Gagal mengambil data destinasi');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDestinasi();
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Memuat data destinasi...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Destinasi Wisata</h1>
      
      {/* Filter Section */}
      <form onSubmit={handleFilter} className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <input
              type="text"
              value={filter.kategori}
              onChange={(e) => setFilter({...filter, kategori: e.target.value})}
              placeholder="outdoor, kuliner, budaya..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Lokasi</label>
            <input
              type="text"
              value={filter.lokasi}
              onChange={(e) => setFilter({...filter, lokasi: e.target.value})}
              placeholder="Cari lokasi..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Harga Min</label>
            <input
              type="number"
              value={filter.minHarga}
              onChange={(e) => setFilter({...filter, minHarga: e.target.value})}
              placeholder="0"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Harga Max</label>
            <input
              type="number"
              value={filter.maxHarga}
              onChange={(e) => setFilter({...filter, maxHarga: e.target.value})}
              placeholder="1000000"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Terapkan Filter
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Destinasi Grid */}
      {destinasi.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Tidak ada destinasi ditemukan
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinasi.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {dest.imageUrl && (
                <img 
                  src={dest.imageUrl} 
                  alt={dest.nama}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{dest.nama}</h3>
                
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">{dest.rating.toFixed(1)}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {dest.deskripsi}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {dest.kategori.slice(0, 3).map((kat, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {kat}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>📍 {dest.lokasi}</span>
                  <span>⏱ {dest.durasi} jam</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    {formatRupiah(dest.harga)}
                  </span>
                  
                  <Link 
                    href={`/destinasi/${dest.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
