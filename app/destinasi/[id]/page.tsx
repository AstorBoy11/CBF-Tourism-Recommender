'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Navbar, Footer } from '@/components/Layout';
import { DestinationCard } from '@/components/DestinationCard';
import { MapPin, Clock, DollarSign, Star, ArrowLeft, Calendar } from 'lucide-react';

export default function DestinationDetailPage() {
  const [user, setUser] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [similarDestinations, setSimilarDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const savedUser = localStorage.getItem('bwi_user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    if (params.id) {
      loadDestination();
    }
  }, [params.id]);

  const loadDestination = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/destinasi/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setDestination(data);
        loadSimilar(data);
      }
    } catch (error) {
      console.error('Failed to load destination:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSimilar = async (current: any) => {
    try {
      const response = await fetch(`/api/destinasi?kategori=${current.kategori}&budget=${current.budget}`);
      const data = await response.json();

      if (response.ok) {
        // Filter out current destination and limit to 3
        const similar = data.filter((d: any) => d.id !== current.id).slice(0, 3);
        setSimilarDestinations(similar);
      }
    } catch (error) {
      console.error('Failed to load similar destinations:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600">Destination not found</p>
          <button
            onClick={() => router.push('/destinasi')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        onViewChange={(view) => router.push(`/${view === 'landing' ? '' : view}`)}
        currentView="destinasi"
        user={user}
        onLogout={() => {
          localStorage.removeItem('bwi_user');
          localStorage.removeItem('token');
          setUser(null);
          router.push('/');
        }}
      />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-blue-400 to-indigo-600">
              {destination.gambar ? (
                <img 
                  src={destination.gambar} 
                  alt={destination.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <MapPin className="w-16 h-16 text-white/50" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-900 capitalize">
                  {destination.kategori}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">{destination.nama}</h1>
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={18} />
                      <span>{destination.lokasi}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      <span>{destination.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Budget</div>
                    <div className="font-semibold text-slate-900 capitalize">{destination.budget}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {destination.budget === 'murah' && '≤ Rp 50K'}
                      {destination.budget === 'sedang' && 'Rp 50K - 150K'}
                      {destination.budget === 'mahal' && '> Rp 150K'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Duration</div>
                    <div className="font-semibold text-slate-900 capitalize">{destination.durasi}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {destination.durasi === 'singkat' && '≤ 3 hours'}
                      {destination.durasi === 'menengah' && '3 - 6 hours'}
                      {destination.durasi === 'panjang' && '> 6 hours'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Best Time</div>
                    <div className="font-semibold text-slate-900">All Year</div>
                    <div className="text-xs text-slate-500 mt-1">Open daily</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Destination</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {destination.deskripsi}
                </p>
              </div>

              {/* Tags */}
              {destination.tags && destination.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Location</h3>
                <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center border border-slate-200">
                  <div className="text-center text-slate-500">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p>Map integration coming soon</p>
                    <p className="text-sm mt-1">{destination.lokasi}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Destinations */}
          {similarDestinations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarDestinations.map(dest => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onClick={() => router.push(`/destinasi/${dest.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
