'use client'

import Navbar from '@/components/layout/Navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          About This Page
        </h1>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '1.5rem' }}>
          Platform ini merupakan sebuah <strong>Content-Based Filtering Tourism Recommendation System </strong> 
          yang dirancang untuk membantu pengguna menemukan destinasi wisata terbaik sesuai preferensi pribadi. 
          Sistem bekerja dengan menganalisis kategori yang disukai, minat perjalanan, serta karakteristik dari 
          setiap tempat wisata.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '1.5rem' }}>
          Setiap perjalanan memiliki cerita dan keunikannya sendiri. Karena itu, sistem ini tidak hanya menampilkan 
          daftar tempat populer, tetapi juga mencocokkan gaya liburan pengguna dengan deskripsi, kategori, dan 
          fitur dari setiap destinasi wisata.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '1rem' }}>
          Untuk menghasilkan rekomendasi yang relevan dan akurat, beberapa metode inti digunakan, yaitu:
        </p>

        <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', paddingLeft: '20px' }}>
          <li><strong>TF-IDF Vectorization</strong> untuk mengekstrak kata-kata penting dari deskripsi destinasi.</li>
          <li><strong>Cosine Similarity</strong> untuk menghitung kedekatan antara preferensi pengguna dan karakteristik destinasi.</li>
          <li><strong>Diversity Injection (MMR)</strong> agar rekomendasi yang muncul lebih bervariasi dan tidak monoton.</li>
        </ul>

      </div>
    </>
  )
}
