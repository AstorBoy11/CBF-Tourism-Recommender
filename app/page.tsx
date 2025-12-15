'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Navbar, Footer, SparklesIcon } from '@/components/Layout';
import { ArrowRight, Target, Zap, Brain } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('bwi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bwi_user');
    localStorage.removeItem('token');
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Discover Your Perfect
                <br />
                <span className="text-yellow-300">Banyuwangi Experience</span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Personalized tourism recommendations powered by Content-Based Filtering AI
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/auth"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Exploring
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Personalized</h3>
              <p className="text-slate-600">
                Recommendations tailored to your preferences for categories, budget, and duration
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">CBF Algorithm</h3>
              <p className="text-slate-600">
                Uses TF-IDF and Cosine Similarity to analyze destination compatibility
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Fast & Accurate</h3>
              <p className="text-slate-600">
                Get relevant tourism destination recommendations in seconds
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">How It Works</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  1
                </div>
                <h4 className="font-bold mb-2 text-slate-900">Choose Preferences</h4>
                <p className="text-sm text-slate-600">
                  Select your desired categories, budget, and duration
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  2
                </div>
                <h4 className="font-bold mb-2 text-slate-900">TF-IDF Analysis</h4>
                <p className="text-sm text-slate-600">
                  System calculates destination feature weights
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  3
                </div>
                <h4 className="font-bold mb-2 text-slate-900">Cosine Similarity</h4>
                <p className="text-sm text-slate-600">
                  Calculates similarity between preferences and destinations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  4
                </div>
                <h4 className="font-bold mb-2 text-slate-900">Get Results</h4>
                <p className="text-sm text-slate-600">
                  View the most suitable destination recommendations
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-12 border border-blue-100">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to Find Your Dream Destination?</h2>
            <p className="text-lg text-slate-600 mb-8">Join now and get personalized recommendations</p>
            <Link 
              href="/auth"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Now →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
