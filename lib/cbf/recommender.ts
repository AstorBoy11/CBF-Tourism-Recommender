/**
 * Content-Based Filtering Recommendation System
 * Menggabungkan TF-IDF dan Cosine Similarity untuk rekomendasi
 */

import { TFIDF } from './tfidf';
import { CosineSimilarity } from './cosine-similarity';

export interface DestinasiItem {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string[];
  lokasi: string;
  harga: number;
  durasi: number;
  fasilitas: string[];
}

export interface UserPreference {
  kategori: string[];
  budget: string;
  durasi: string;
  lokasi?: string;
}

export interface RecommendationResult {
  destinasi: DestinasiItem;
  score: number;
  matchedFeatures: string[];
}

export class CBFRecommender {
  private tfidf: TFIDF;
  private cosineSimilarity: CosineSimilarity;
  
  constructor() {
    this.tfidf = new TFIDF();
    this.cosineSimilarity = new CosineSimilarity();
  }
  
  /**
   * Membuat text representation dari destinasi untuk TF-IDF
   */
  private createDestinasiText(destinasi: DestinasiItem): string {
    const parts = [
      destinasi.nama,
      destinasi.deskripsi,
      ...destinasi.kategori,
      destinasi.lokasi,
      ...destinasi.fasilitas
    ];
    
    return parts.join(' ');
  }
  
  /**
   * Membuat text representation dari user preference
   */
  private createPreferenceText(preference: UserPreference): string {
    const parts = [
      ...preference.kategori,
      preference.budget,
      preference.durasi,
    ];
    
    if (preference.lokasi) {
      parts.push(preference.lokasi);
    }
    
    return parts.join(' ');
  }
  
  /**
   * Filter destinasi berdasarkan budget
   */
  private filterByBudget(destinasi: DestinasiItem, budget: string): boolean {
    const harga = destinasi.harga;
    
    switch (budget.toLowerCase()) {
      case 'murah':
        return harga <= 50000;
      case 'sedang':
        return harga > 50000 && harga <= 150000;
      case 'mahal':
        return harga > 150000;
      default:
        return true;
    }
  }
  
  /**
   * Filter destinasi berdasarkan durasi
   */
  private filterByDurasi(destinasi: DestinasiItem, durasi: string): boolean {
    const durasiJam = destinasi.durasi;
    
    switch (durasi.toLowerCase()) {
      case 'singkat':
        return durasiJam <= 3;
      case 'menengah':
        return durasiJam > 3 && durasiJam <= 6;
      case 'panjang':
        return durasiJam > 6;
      default:
        return true;
    }
  }
  
  /**
   * Identifikasi fitur yang match antara preferensi dan destinasi
   */
  private getMatchedFeatures(
    destinasi: DestinasiItem, 
    preference: UserPreference
  ): string[] {
    const matched: string[] = [];
    
    // Check kategori match
    const kategoriMatch = preference.kategori.filter(k => 
      destinasi.kategori.includes(k)
    );
    if (kategoriMatch.length > 0) {
      matched.push(`Kategori: ${kategoriMatch.join(', ')}`);
    }
    
    // Check lokasi match
    if (preference.lokasi && 
        destinasi.lokasi.toLowerCase().includes(preference.lokasi.toLowerCase())) {
      matched.push(`Lokasi: ${destinasi.lokasi}`);
    }
    
    // Check budget match
    if (this.filterByBudget(destinasi, preference.budget)) {
      matched.push(`Budget: ${preference.budget}`);
    }
    
    // Check durasi match
    if (this.filterByDurasi(destinasi, preference.durasi)) {
      matched.push(`Durasi: ${preference.durasi}`);
    }
    
    return matched;
  }
  
  /**
   * Generate rekomendasi berdasarkan user preference
   */
  recommend(
    userPreference: UserPreference,
    allDestinasi: DestinasiItem[],
    topN: number = 10
  ): RecommendationResult[] {
    // Filter destinasi berdasarkan budget dan durasi
    let filteredDestinasi = allDestinasi.filter(dest => 
      this.filterByBudget(dest, userPreference.budget) &&
      this.filterByDurasi(dest, userPreference.durasi)
    );
    
    // Jika ada preferensi lokasi, prioritaskan
    if (userPreference.lokasi) {
      const lokasiMatches = filteredDestinasi.filter(dest =>
        dest.lokasi.toLowerCase().includes(userPreference.lokasi!.toLowerCase())
      );
      
      if (lokasiMatches.length > 0) {
        filteredDestinasi = lokasiMatches;
      }
    }
    
    // Jika tidak ada destinasi yang cocok setelah filter, return empty
    if (filteredDestinasi.length === 0) {
      return [];
    }
    
    // Buat text representation
    const destinasiTexts = filteredDestinasi.map(d => this.createDestinasiText(d));
    const preferenceText = this.createPreferenceText(userPreference);
    
    // Hitung TF-IDF
    const destinasiVectors = this.tfidf.fitTransform(destinasiTexts);
    const preferenceVector = this.tfidf.transform(preferenceText);
    
    // Hitung Cosine Similarity
    const similarities = this.cosineSimilarity.calculateMultiple(
      preferenceVector,
      destinasiVectors
    );
    
    // Map hasil ke format RecommendationResult
    const recommendations: RecommendationResult[] = similarities
      .slice(0, topN)
      .map(({ index, score }) => ({
        destinasi: filteredDestinasi[index],
        score: score,
        matchedFeatures: this.getMatchedFeatures(
          filteredDestinasi[index],
          userPreference
        )
      }))
      .filter(rec => rec.score > 0); // Filter score > 0
    
    return recommendations;
  }
}
