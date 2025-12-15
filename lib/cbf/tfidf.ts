/**
 * TF-IDF (Term Frequency-Inverse Document Frequency) Implementation
 * Digunakan untuk menghitung bobot term dalam dokumen
 */

interface TFIDFResult {
  [term: string]: number;
}

export class TFIDF {
  private documents: string[] = [];
  private vocabulary: Set<string> = new Set();
  
  /**
   * Menghitung Term Frequency (TF)
   * TF = (jumlah kemunculan term dalam dokumen) / (total term dalam dokumen)
   */
  private calculateTF(document: string): Map<string, number> {
    const terms = this.tokenize(document);
    const termCount = new Map<string, number>();
    
    // Hitung kemunculan setiap term
    terms.forEach(term => {
      termCount.set(term, (termCount.get(term) || 0) + 1);
    });
    
    // Normalisasi dengan total term
    const totalTerms = terms.length;
    termCount.forEach((count, term) => {
      termCount.set(term, count / totalTerms);
    });
    
    return termCount;
  }
  
  /**
   * Menghitung Inverse Document Frequency (IDF)
   * IDF = log(total dokumen / jumlah dokumen yang mengandung term)
   */
  private calculateIDF(term: string): number {
    const totalDocs = this.documents.length;
    const docsWithTerm = this.documents.filter(doc => 
      this.tokenize(doc).includes(term)
    ).length;
    
    if (docsWithTerm === 0) return 0;
    return Math.log(totalDocs / docsWithTerm);
  }
  
  /**
   * Tokenize dokumen menjadi array of terms
   * Menghapus karakter khusus dan mengubah ke lowercase
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(term => term.length > 2); // Filter term dengan panjang > 2
  }
  
  /**
   * Fit model dengan dokumen-dokumen
   */
  fit(documents: string[]): void {
    this.documents = documents;
    this.vocabulary.clear();
    
    // Build vocabulary dari semua dokumen
    documents.forEach(doc => {
      this.tokenize(doc).forEach(term => {
        this.vocabulary.add(term);
      });
    });
  }
  
  /**
   * Transform dokumen menjadi TF-IDF vector
   */
  transform(document: string): TFIDFResult {
    const tf = this.calculateTF(document);
    const tfidf: TFIDFResult = {};
    
    this.vocabulary.forEach(term => {
      const tfValue = tf.get(term) || 0;
      const idfValue = this.calculateIDF(term);
      tfidf[term] = tfValue * idfValue;
    });
    
    return tfidf;
  }
  
  /**
   * Fit dan transform sekaligus
   */
  fitTransform(documents: string[]): TFIDFResult[] {
    this.fit(documents);
    return documents.map(doc => this.transform(doc));
  }
}
