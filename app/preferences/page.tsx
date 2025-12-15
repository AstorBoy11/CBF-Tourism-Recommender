'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components/Layout';
import { CheckCircle } from 'lucide-react';

const CATEGORIES = ['outdoor', 'kuliner', 'budaya', 'alam', 'religi', 'sejarah', 'petualangan', 'pantai', 'gunung', 'belanja'];
const BUDGETS = ['murah', 'sedang', 'mahal'];
const DURATIONS = ['singkat', 'menengah', 'panjang'];

export default function PreferencesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    kategori: [] as string[],
    budget: 'sedang',
    durasi: 'menengah',
    lokasi: ''
  });
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('bwi_user');
    const token = localStorage.getItem('token');

    if (!savedUser || !token) {
      router.push('/auth');
      return;
    }

    setUser(JSON.parse(savedUser));
  }, []);

  const toggleCategory = (cat: string) => {
    if (formData.kategori.includes(cat)) {
      setFormData({
        ...formData,
        kategori: formData.kategori.filter(c => c !== cat)
      });
    } else {
      setFormData({
        ...formData,
        kategori: [...formData.kategori, cat]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.kategori.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to save preferences');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        onViewChange={(view) => router.push(`/${view === 'landing' ? '' : view}`)}
        currentView="preferences"
        user={user}
        onLogout={() => {
          localStorage.removeItem('bwi_user');
          localStorage.removeItem('token');
          router.push('/');
        }}
      />

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-8 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Set Your Preferences</h2>
              <p className="mt-2 text-slate-500">
                Select categories you are interested in. This data builds your vector profile for the CBF algorithm.
              </p>
            </div>

            {error && (
              <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-4">
                  Select Interest Categories *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`relative flex items-center justify-center p-4 border rounded-lg text-sm font-medium transition-all capitalize ${
                        formData.kategori.includes(cat)
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {formData.kategori.includes(cat) && (
                        <CheckCircle size={16} className="absolute top-2 right-2 text-blue-600" />
                      )}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-4">
                  Budget Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {BUDGETS.map(budget => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget })}
                      className={`p-4 border rounded-lg text-sm font-medium transition-all capitalize ${
                        formData.budget === budget
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {budget}
                      <div className="text-xs text-slate-500 mt-1">
                        {budget === 'murah' && '≤ Rp 50K'}
                        {budget === 'sedang' && 'Rp 50K - 150K'}
                        {budget === 'mahal' && '> Rp 150K'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-4">
                  Duration Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {DURATIONS.map(durasi => (
                    <button
                      key={durasi}
                      type="button"
                      onClick={() => setFormData({ ...formData, durasi })}
                      className={`p-4 border rounded-lg text-sm font-medium transition-all capitalize ${
                        formData.durasi === durasi
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {durasi}
                      <div className="text-xs text-slate-500 mt-1">
                        {durasi === 'singkat' && '≤ 3 hours'}
                        {durasi === 'menengah' && '3 - 6 hours'}
                        {durasi === 'panjang' && '> 6 hours'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="lokasi" className="text-sm font-medium text-slate-700 block mb-2">
                  Location Preference (Optional)
                </label>
                <input
                  id="lokasi"
                  type="text"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="e.g., Pesanggaran, Glagah, Licin..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium placeholder:text-slate-500"
                />
              </div>

              <div className="bg-slate-50 -mx-6 -mb-6 px-6 py-4 flex items-center justify-end border-t border-slate-200">
                <button
                  type="submit"
                  disabled={loading || formData.kategori.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? 'Saving...' : 'Save & Generate Recommendations'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
