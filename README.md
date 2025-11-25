# CBF Tourism Recommender System 🏝️

Sistem Rekomendasi Pariwisata berbasis Web yang dibangun menggunakan **Next.js 16**, dirancang untuk memberikan rekomendasi destinasi wisata yang personal menggunakan metode **Content-Based Filtering (CBF)**.

![Project Status](https://img.shields.io/badge/Status-Development-blue)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_|_Tailwind_|_MUI-purple)

## 📖 Deskripsi

Aplikasi ini membantu wisatawan menemukan destinasi yang paling relevan dengan minat mereka (seperti Pantai, Alam, Budaya, Petualangan) serta batasan budget. Sistem tidak hanya merekomendasikan tempat populer, tetapi menggunakan algoritma pemrosesan teks dan vektor matematika untuk mencocokkan profil pengguna dengan karakteristik unik setiap tempat wisata.

Fitur unggulan meliputi peta interaktif, manajemen preferensi pengguna, dan dasbor analitik.

## 🚀 Fitur Utama

* **Smart Recommendation Engine**: Menggunakan algoritma CBF untuk saran yang akurat.
* **Interactive Maps**: Integrasi Google Maps untuk eksplorasi lokasi visual.
* **User Preferences**: Kustomisasi minat (kategori wisata) dan budget.
* **Diversity Injection**: Menggunakan algoritma MMR (Maximal Marginal Relevance) untuk memastikan variasi rekomendasi.
* **Dashboard**: Pantauan statistik kunjungan dan tempat favorit.
* **Evaluasi Sistem**: Halaman metrik untuk melihat performa rekomendasi (Precision, Recall, F1-Score).

## 🧠 Algoritma & Teknologi

Sistem ini dibangun di atas konsep *Information Retrieval* modern:

1.  **TF-IDF (Term Frequency-Inverse Document Frequency)**:
    Digunakan untuk menganalisis deskripsi dan fitur destinasi wisata, mengubah teks menjadi bobot numerik untuk menentukan kata kunci yang paling penting dalam setiap dokumen.

2.  **Cosine Similarity**:
    Menghitung derajat kemiripan antara vektor profil pengguna (preferensi) dan vektor destinasi wisata. Semakin kecil sudut antar vektor, semakin relevan rekomendasinya.

3.  **Adaptive Learning**:
    Sistem melacak interaksi pengguna (view, like, rate) untuk memperbarui bobot preferensi secara dinamis.

## 🛠️ Tech Stack

* **Frontend Framework**: Next.js 16 (App Router)
* **UI Library**: Material UI (MUI) v7 & Tailwind CSS v4
* **Language**: JavaScript (React 19)
* **Maps**: Google Maps JavaScript API
* **State Management**: React Context API

## ⚙️ Instalasi & Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan proyek di lokal komputer Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/cbf-tourism-recommender.git](https://github.com/username/cbf-tourism-recommender.git)
    cd cbf-tourism-recommender
    ```

2.  **Instal Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables**
    Buat file `.env.local` di root folder dan tambahkan konfigurasi berikut (sesuaikan dengan API Key Anda):
    ```env
    VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
    VITE_API_BASE_URL=http://localhost:3000/api
    ```
    *(Catatan: Kode saat ini menggunakan prefix `VITE_` karena migrasi atau setup awal, pastikan disesuaikan jika menggunakan Next.js env standar)*.

4.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```

5.  **Buka Aplikasi**
    Buka browser dan akses [http://localhost:3000](http://localhost:3000).

## wm Struktur Project
