'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PreferenceFormProps {
  onSuccess?: () => void;
}

export default function PreferenceForm({ onSuccess }: PreferenceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    kategori: [] as string[],
    budget: 'sedang',
    durasi: 'menengah',
    lokasi: ''
  });

  const kategoriOptions = [
    'outdoor',
    'kuliner',
    'budaya',
    'alam',
    'religi',
    'sejarah',
    'petualangan',
    'pantai',
    'gunung',
    'belanja'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.kategori.length === 0) {
      setError('Pilih minimal 1 kategori');
      return;
    }

    setLoading(true);

    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/recommendations');
        }
      } else {
        setError(data.error || 'Gagal menyimpan preferensi');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan preferensi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Preferensi Wisata</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block text-sm font-medium mb-3">
            Budget Perjalanan
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData({...formData, budget: 'murah'})}
              className={`px-4 py-3 rounded-md border-2 transition-colors ${
                formData.budget === 'murah'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
              }`}
            >
              <div className="font-semibold">Murah</div>
              <div className="text-xs mt-1">≤ Rp 50.000</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({...formData, budget: 'sedang'})}
              className={`px-4 py-3 rounded-md border-2 transition-colors ${
                formData.budget === 'sedang'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              <div className="font-semibold">Sedang</div>
              <div className="text-xs mt-1">Rp 50K - 150K</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({...formData, budget: 'mahal'})}
              className={`px-4 py-3 rounded-md border-2 transition-colors ${
                formData.budget === 'mahal'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
              }`}
            >
              <div className="font-semibold">Mahal</div>
              <div className="text-xs mt-1">&gt; Rp 150.000</div>
            </button>
          </div>
        </div>

        {/* Durasi Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Durasi Kunjungan
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData({...formData, durasi: 'singkat'})}
              className={`px-4 py-3 rounded-md border-2 transition-colors ${
                formData.durasi === 'singkat'
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
              }`}
            >
              <div className="font-semibold">Singkat</div>
              <div className="text-xs mt-1">≤ 3 jam</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({...formData, durasi: 'menengah'})}
              className={`px-4 py-3 rounded-md border-2 transition-colors ${
                formData.durasi === 'menengah'
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
              }`}
            >
              <div className="font-semibold">Menengah</div>
              <div className="text-xs mt-1">3 - 6 jam</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({...formData, durasi: 'panjang'})}
              className={`px-4 py-3 rounded-md border-2 transition-colors ${
                formData.durasi === 'panjang'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
              }`}
            >
              <div className="font-semibold">Panjang</div>
              <div className="text-xs mt-1">&gt; 6 jam</div>
            </button>
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
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium placeholder:text-slate-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? 'Menyimpan...' : 'Cari Rekomendasi'}
        </button>
      </form>
    </div>
  );
}
