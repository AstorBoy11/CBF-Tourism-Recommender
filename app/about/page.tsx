'use client';

import { useRouter } from 'next/navigation';
import { Navbar, Footer } from '@/components/Layout';
import { BookOpen, BarChart2, Compass } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">About the Algorithm</h1>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-slate-500">Understanding Content-Based Filtering (CBF)</p>
          </div>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">1. Vector Space Model</h3>
                  <p className="mt-3 sm:mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
                    In this recommendation system, every tourism destination is represented as a vector of features 
                    (Category, Tags, Description keywords). The user's preferences are also modeled as a vector.
                  </p>
                  <div className="mt-6 bg-slate-50 p-4 rounded font-mono text-xs text-slate-700">
                    User Vector = [Beach: 1, Mountain: 0, Nature: 1, Culture: 0]<br/>
                    Item Vector = [Beach: 1, Mountain: 0, Nature: 1, Culture: 1]
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <BarChart2 />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-slate-900">2. TF-IDF Weighting</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                    <strong>Term Frequency-Inverse Document Frequency</strong> is used to evaluate how important 
                    a word is to a document in a collection. Words like "Beautiful" might appear everywhere (low weight), 
                    but "Crater" appears rarely (high weight for Kawah Ijen).
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start">
                      <span className="text-purple-600 font-bold mr-3">TF:</span>
                      <p className="text-slate-600">Measures how frequently a term appears in a document</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 font-bold mr-3">IDF:</span>
                      <p className="text-slate-600">Measures how important a term is across all documents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <Compass />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-slate-900">3. Cosine Similarity</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                    We calculate the cosine of the angle between the User Vector and the Destination Vector. 
                    A cosine value of 1 means they point in the exact same direction (Perfect Match), 
                    while 0 means no similarity.
                  </p>
                  <div className="mt-6 bg-slate-50 p-4 rounded font-mono text-sm text-slate-700">
                    Similarity(A, B) = (A · B) / (||A|| * ||B||)
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-2xl font-bold text-green-600">1.0</div>
                      <div className="text-xs text-green-700">Perfect Match</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="text-2xl font-bold text-yellow-600">0.5</div>
                      <div className="text-xs text-yellow-700">Partial Match</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <div className="text-2xl font-bold text-red-600">0.0</div>
                      <div className="text-xs text-red-700">No Match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">How It Works Together</h3>
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">1</span>
                  <p><strong>User Input:</strong> You select your preferences (e.g., "Beach", "Nature", "Adventure")</p>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">2</span>
                  <p><strong>TF-IDF Processing:</strong> System converts both your preferences and destination features into weighted vectors</p>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">3</span>
                  <p><strong>Cosine Similarity:</strong> Calculates match score between your preferences and each destination</p>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">4</span>
                  <p><strong>Results:</strong> Destinations are ranked by similarity score and presented to you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
