import { cosineSimilarity } from '@/utils/cosineSimilarity'

describe('Cosine Similarity Utility', () => {
  test('calculates cosine similarity for identical vectors', () => {
    const vectorA = [1, 2, 3]
    const vectorB = [1, 2, 3]
    
    const result = cosineSimilarity(vectorA, vectorB)
    
    expect(result).toBeCloseTo(1, 5)
  })

  test('calculates cosine similarity for orthogonal vectors', () => {
    const vectorA = [1, 0, 0]
    const vectorB = [0, 1, 0]
    
    const result = cosineSimilarity(vectorA, vectorB)
    
    expect(result).toBeCloseTo(0, 5)
  })

  test('calculates cosine similarity for opposite vectors', () => {
    const vectorA = [1, 2, 3]
    const vectorB = [-1, -2, -3]
    
    const result = cosineSimilarity(vectorA, vectorB)
    
    expect(result).toBeCloseTo(-1, 5)
  })

  test('handles vectors with different magnitudes', () => {
    const vectorA = [3, 4]
    const vectorB = [6, 8]
    
    const result = cosineSimilarity(vectorA, vectorB)
    
    expect(result).toBeCloseTo(1, 5)
  })

  test('handles zero vectors', () => {
    const vectorA = [0, 0, 0]
    const vectorB = [1, 2, 3]
    
    const result = cosineSimilarity(vectorA, vectorB)
    
    expect(result).toBe(0)
  })

  test('handles empty vectors', () => {
    const vectorA = []
    const vectorB = []
    
    const result = cosineSimilarity(vectorA, vectorB)
    
    expect(result).toBe(0)
  })
})
