/**
 * Cosine Similarity Implementation
 * Digunakan untuk mengukur kesamaan antara dua vector
 */

interface Vector {
  [key: string]: number;
}

export class CosineSimilarity {
  /**
   * Menghitung dot product dari dua vector
   */
  private dotProduct(vectorA: Vector, vectorB: Vector): number {
    let product = 0;
    
    for (const key in vectorA) {
      if (vectorB[key]) {
        product += vectorA[key] * vectorB[key];
      }
    }
    
    return product;
  }
  
  /**
   * Menghitung magnitude (panjang) vector
   */
  private magnitude(vector: Vector): number {
    let sum = 0;
    
    for (const key in vector) {
      sum += vector[key] * vector[key];
    }
    
    return Math.sqrt(sum);
  }
  
  /**
   * Menghitung cosine similarity antara dua vector
   * Formula: cosine_similarity = (A · B) / (||A|| * ||B||)
   * Range: -1 (berlawanan) to 1 (identik), 0 (orthogonal/tidak related)
   */
  calculate(vectorA: Vector, vectorB: Vector): number {
    const dotProd = this.dotProduct(vectorA, vectorB);
    const magA = this.magnitude(vectorA);
    const magB = this.magnitude(vectorB);
    
    if (magA === 0 || magB === 0) return 0;
    
    return dotProd / (magA * magB);
  }
  
  /**
   * Menghitung similarity score antara query dan multiple dokumen
   * Returns array of {index, score} sorted by score descending
   */
  calculateMultiple(
    queryVector: Vector, 
    documentVectors: Vector[]
  ): Array<{ index: number; score: number }> {
    const results = documentVectors.map((docVector, index) => ({
      index,
      score: this.calculate(queryVector, docVector)
    }));
    
    // Sort by score descending
    return results.sort((a, b) => b.score - a.score);
  }
}
