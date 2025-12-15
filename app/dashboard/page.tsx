'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components/Layout';
import { DestinationCard } from '@/components/DestinationCard';
import { Star, BarChart2, ArrowRight, Settings } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>({ categories: [] });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, interests: 0 });
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('bwi_user');
    const token = localStorage.getItem('token');

    if (!savedUser || !token) {
      router.push('/auth');
      return;
    }

    setUser(JSON.parse(savedUser));
    loadPreferences();
    loadStats();
  }, []);

  const loadPreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/preferences', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const lastPref = data.data[0];
          setPreferences({
            categories: lastPref.kategori,
            budget: lastPref.budget,
            durasi: lastPref.durasi,
            lokasi: lastPref.lokasi
          });
          loadRecommendations(lastPref);
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendations = async (prefs: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          kategori: prefs.kategori,
          budget: prefs.budget,
          durasi: prefs.durasi,
          lokasi: prefs.lokasi,
          limit: 3
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.data || []);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/destinasi');
      if (response.ok) {
        const data = await response.json();
        setStats({
          total: data.count || 0,
          interests: preferences.categories?.length || 0
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bwi_user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        onViewChange={(view) => router.push(`/${view === 'landing' ? '' : view}`)}
        currentView="dashboard"
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Hello, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-slate-500 mt-1">Here is your tourism activity summary.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Total Destinations</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Your Interests</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{preferences.categories?.length || 0}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:col-span-2 flex items-center justify-between">
              <div>
                <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Model Status</div>
                <div className="text-lg font-medium text-green-600 mt-1 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  {preferences.categories?.length > 0 ? 'Personalization Active' : 'No Preferences Set'}
                </div>
              </div>
              <button 
                onClick={() => router.push('/preferences')}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Update Preferences
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <Star className="text-yellow-500 mr-2" fill="currentColor" />
            Top Recommendations For You
          </h2>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recommendations.map((dest: any) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onClick={() => router.push(`/destinasi/${dest.id}`)}
                  matchScore={Math.round((dest.score || 0) * 100)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
              <Settings className="mx-auto text-blue-600 mb-4" size={48} />
              <p className="text-blue-800 font-medium">No preferences set yet.</p>
              <p className="text-blue-600 text-sm mt-2 mb-4">
                Set your interests to get personalized AI recommendations.
              </p>
              <button 
                onClick={() => router.push('/preferences')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                Set Preferences Now
              </button>
            </div>
          )}

          <div className="mt-8 text-right">
            <button 
              onClick={() => router.push('/destinasi')}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Explore All Destinations <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
