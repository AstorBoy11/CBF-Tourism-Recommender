'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components/Layout';
import { DestinationCard } from '@/components/DestinationCard';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['outdoor', 'kuliner', 'budaya', 'alam', 'religi', 'sejarah', 'petualangan', 'pantai', 'gunung', 'belanja'];
const BUDGETS = ['murah', 'sedang', 'mahal'];

export default function DestinasiPage() {
  const [user, setUser] = useState<any>(null);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('bwi_user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    loadDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [destinations, searchTerm, selectedCategory, selectedBudget]);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/destinasi');
      const data = await response.json();

      if (response.ok) {
        setDestinations(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to load destinations:', error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    if (!Array.isArray(destinations)) {
      setFilteredDestinations([]);
      return;
    }

    let filtered = [...destinations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d => 
        d.nama?.toLowerCase().includes(term) || 
        d.deskripsi?.toLowerCase().includes(term) ||
        d.lokasi?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(d => 
        d.kategori?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (selectedBudget) {
      filtered = filtered.filter(d => 
        d.harga && (
          (selectedBudget === 'murah' && d.harga <= 50000) ||
          (selectedBudget === 'sedang' && d.harga > 50000 && d.harga <= 150000) ||
          (selectedBudget === 'mahal' && d.harga > 150000)
        )
      );
    }

    setFilteredDestinations(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBudget('');
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Destinations</h1>
            <p className="text-lg text-slate-600">Browse all tourism destinations in Banyuwangi</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors text-slate-700 font-medium"
              >
                <Filter size={20} />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize text-slate-900 font-medium"
                    >
                      <option value="">All Categories</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat} className="capitalize">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">
                      Budget
                    </label>
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize text-slate-900 font-medium"
                    >
                      <option value="">All Budgets</option>
                      {BUDGETS.map(budget => (
                        <option key={budget} value={budget} className="capitalize">{budget}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {(searchTerm || selectedCategory || selectedBudget) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading destinations...</p>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200 shadow-sm">
              <p className="text-xl font-semibold text-slate-800 mb-2">No destinations found</p>
              <p className="text-sm text-slate-500 mb-4">Try adjusting your search or filters</p>
              {(searchTerm || selectedCategory || selectedBudget) && (
                <button
                  onClick={clearFilters}
                  className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Clear filters to see all
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-slate-600">
                Showing {Array.isArray(filteredDestinations) ? filteredDestinations.length : 0} of {Array.isArray(destinations) ? destinations.length : 0} destinations
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(filteredDestinations) && filteredDestinations.map(destination => (
                  <DestinationCard 
                    key={destination.id} 
                    destination={destination}
                    onClick={() => router.push(`/destinasi/${destination.id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
