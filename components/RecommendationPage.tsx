'use client';

import { useState } from 'react';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

interface Recommendation {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string;  // comma-separated
  lokasi: string;
  rating: number;
  harga: number;
  durasi: number;
  fasilitas: string;  // comma-separated
  imageUrl?: string;
  score: number;
  matchedFeatures: string[];
  tags?: string;  // comma-separated
}

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    kategori: [] as string[],
    budget: 'sedang',
    durasi: 'menengah',
    lokasi: ''
  });

  const kategoriOptions = [
    'outdoor', 'kuliner', 'budaya', 'alam', 'religi',
    'sejarah', 'petualangan', 'pantai', 'gunung', 'belanja'
  ];

  const handleKategoriToggle = (kat: string) => {
    if (formData.kategori.includes(kat)) {
      setFormData({
        ...formData,
        kategori: formData.kategori.filter(k => k !== kat)
      });
    } else {
      setFormData({
        ...formData,
        kategori: [...formData.kategori, kat]
      });
    }
  };

  const handleGetRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.kategori.length === 0) {
      setError('Pilih minimal 1 kategori');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setRecommendations(data.data);
        setShowForm(false);
      } else {
        setError(data.error || 'Gagal mendapatkan rekomendasi');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mendapatkan rekomendasi');
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Dapatkan Rekomendasi Wisata</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleGetRecommendations} className="space-y-6">
          {/* Kategori Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Kategori Wisata yang Anda Suka
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {kategoriOptions.map((kat) => (
                <button
                  key={kat}
                  type="button"
                  onClick={() => handleKategoriToggle(kat)}
                  className={`px-4 py-2 rounded-md border-2 transition-colors ${
                    formData.kategori.includes(kat)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Budget Perjalanan</label>
            <div className="grid grid-cols-3 gap-3">
              {['murah', 'sedang', 'mahal'].map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setFormData({...formData, budget})}
                  className={`px-4 py-3 rounded-md border-2 transition-colors ${
                    formData.budget === budget
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="font-semibold capitalize">{budget}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Durasi Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Durasi Kunjungan</label>
            <div className="grid grid-cols-3 gap-3">
              {['singkat', 'menengah', 'panjang'].map((durasi) => (
                <button
                  key={durasi}
                  type="button"
                  onClick={() => setFormData({...formData, durasi})}
                  className={`px-4 py-3 rounded-md border-2 transition-colors ${
                    formData.durasi === durasi
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="font-semibold capitalize">{durasi}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Lokasi Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Preferensi Lokasi (Opsional)
            </label>
            <input
              type="text"
              value={formData.lokasi}
              onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
              placeholder="Contoh: Yogyakarta, Bali, Jakarta..."
              className="w-full px-4 py-2 border rounded-md text-slate-900 font-medium placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
          >
            {loading ? 'Mencari Rekomendasi...' : 'Cari Rekomendasi'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rekomendasi Destinasi Wisata</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Ubah Preferensi
        </button>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Tidak ada rekomendasi yang sesuai dengan preferensi Anda
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={rec.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                {rec.imageUrl && (
                  <div className="md:w-1/3">
                    <img
                      src={rec.imageUrl}
                      alt={rec.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-blue-600">
                          #{index + 1}
                        </span>
                        <h2 className="text-2xl font-bold">{rec.nama}</h2>
                      </div>
                      <div className="flex items-center mt-2">
                        <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                        <span className="text-sm">{rec.rating.toFixed(1)}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-sm text-gray-600">
                          Match Score: {(rec.score * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{rec.deskripsi}</p>

                  {/* Matched Features */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2 text-green-700 flex items-center gap-1">
                      <CheckCircle size={16} /> Sesuai dengan preferensi Anda:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {rec.matchedFeatures.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Kategori */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rec.kategori.split(',').map((kat: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {kat.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Lokasi:</span>
                      <div className="font-medium flex items-center gap-1"><MapPin size={14} /> {rec.lokasi}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Durasi:</span>
                      <div className="font-medium flex items-center gap-1"><Clock size={14} /> {rec.durasi} jam</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Harga:</span>
                      <div className="font-medium text-blue-600">
                        {formatRupiah(rec.harga)}
                      </div>
                    </div>
                  </div>

                  {/* Fasilitas */}
                  {rec.fasilitas && rec.fasilitas.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-500">Fasilitas:</span>
                      <div className="mt-1">
                        {rec.fasilitas.split(',').map((f: string) => f.trim()).join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
