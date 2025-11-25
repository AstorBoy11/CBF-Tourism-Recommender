// Similarity Service - Calculates similarity between destinations
import { cosineSimilarity } from '../utils/cosineSimilarity'
import { calculateTFIDF } from '../utils/tfidf'

class SimilarityService {
  // Calculate similarity between two destinations
  calculateSimilarity(destination1, destination2) {
    // Combine text features
    const text1 = this.combineFeatures(destination1)
    const text2 = this.combineFeatures(destination2)
    
    // Calculate TF-IDF vectors
    const vector1 = calculateTFIDF(text1)
    const vector2 = calculateTFIDF(text2)
    
    // Calculate cosine similarity
    return cosineSimilarity(vector1, vector2)
  }

  // Combine destination features into text
  combineFeatures(destination) {
    return [
      destination.name,
      destination.description,
      destination.category,
      destination.location,
      ...(destination.tags || [])
    ].join(' ')
  }

  // Find similar destinations
  findSimilar(targetDestination, allDestinations, topN = 5) {
    const similarities = allDestinations
      .filter(dest => dest.id !== targetDestination.id)
      .map(dest => ({
        destination: dest,
        similarity: this.calculateSimilarity(targetDestination, dest)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topN)
    
    return similarities
  }
}

export default new SimilarityService()
