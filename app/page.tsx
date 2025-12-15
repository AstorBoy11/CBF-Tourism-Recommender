import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🏝️ Sistem Rekomendasi Destinasi Wisata
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Temukan destinasi wisata yang sesuai dengan preferensi Anda menggunakan Content-Based Filtering
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/recommendations"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Cari Rekomendasi
            </Link>
            
            <Link 
              href="/destinasi"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Lihat Destinasi
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Personalisasi</h3>
            <p className="text-gray-600">
              Rekomendasi disesuaikan dengan preferensi kategori, budget, dan durasi wisata Anda
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">Algoritma CBF</h3>
            <p className="text-gray-600">
              Menggunakan TF-IDF dan Cosine Similarity untuk menganalisis kecocokan destinasi
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Cepat & Akurat</h3>
            <p className="text-gray-600">
              Dapatkan rekomendasi destinasi wisata yang relevan dalam hitungan detik
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Cara Kerja</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">Pilih Preferensi</h4>
              <p className="text-sm text-gray-600">
                Pilih kategori wisata, budget, dan durasi yang Anda inginkan
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">Analisis TF-IDF</h4>
              <p className="text-sm text-gray-600">
                Sistem menghitung bobot fitur destinasi dengan TF-IDF
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Cosine Similarity</h4>
              <p className="text-sm text-gray-600">
                Menghitung kemiripan antara preferensi dan destinasi
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold mb-2">Dapatkan Hasil</h4>
              <p className="text-sm text-gray-600">
                Lihat rekomendasi destinasi yang paling sesuai
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Menemukan Destinasi Impian?</h2>
          <Link 
            href="/recommendations"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Mulai Sekarang →
          </Link>
              Learning
            </a>{" "}
            center.
          </p>
        </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
