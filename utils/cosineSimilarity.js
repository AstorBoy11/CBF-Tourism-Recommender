// Cosine Similarity calculation

// Calculate cosine similarity for array vectors
export function calculateCosineSimilarity(vectorA, vectorB) {
  if (!Array.isArray(vectorA) || !Array.isArray(vectorB)) {
    return 0
  }

  if (vectorA.length === 0 || vectorB.length === 0) {
    return 0
  }

  const length = Math.min(vectorA.length, vectorB.length)
  
  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0
  
  for (let i = 0; i < length; i++) {
    const a = vectorA[i] || 0
    const b = vectorB[i] || 0
    
    dotProduct += a * b
    magnitudeA += a * a
    magnitudeB += b * b
  }
  
  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }
  
  return dotProduct / (magnitudeA * magnitudeB)
}

// Calculate cosine similarity for object vectors
export function cosineSimilarity(vectorA, vectorB) {
  // Get all unique keys from both vectors
  const keys = new Set([...Object.keys(vectorA), ...Object.keys(vectorB)])
  
  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0
  
  keys.forEach(key => {
    const a = vectorA[key] || 0
    const b = vectorB[key] || 0
    
    dotProduct += a * b
    magnitudeA += a * a
    magnitudeB += b * b
  })
  
  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }
  
  return dotProduct / (magnitudeA * magnitudeB)
}

// Calculate cosine similarity for array vectors
export function cosineSimilarityArray(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    throw new Error('Vectors must have the same length')
  }
  
  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0
  
  for (let i = 0; i < arrayA.length; i++) {
    dotProduct += arrayA[i] * arrayB[i]
    magnitudeA += arrayA[i] * arrayA[i]
    magnitudeB += arrayB[i] * arrayB[i]
  }
  
  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }
  
  return dotProduct / (magnitudeA * magnitudeB)
}
