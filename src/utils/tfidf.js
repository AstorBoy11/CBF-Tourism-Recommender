// TF-IDF (Term Frequency-Inverse Document Frequency) calculation

export function calculateTFIDF(text, corpus = []) {
  const terms = tokenize(text)
  const termFrequency = calculateTF(terms)
  
  if (corpus.length === 0) {
    // Return TF if no corpus provided
    return termFrequency
  }
  
  const idf = calculateIDF(terms, corpus)
  
  // Calculate TF-IDF
  const tfidf = {}
  for (const term in termFrequency) {
    tfidf[term] = termFrequency[term] * (idf[term] || 0)
  }
  
  return tfidf
}

// Tokenize text into terms
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(term => term.length > 2) // Filter short words
}

// Calculate Term Frequency
function calculateTF(terms) {
  const tf = {}
  const totalTerms = terms.length
  
  terms.forEach(term => {
    tf[term] = (tf[term] || 0) + 1
  })
  
  // Normalize
  for (const term in tf) {
    tf[term] = tf[term] / totalTerms
  }
  
  return tf
}

// Calculate Inverse Document Frequency
function calculateIDF(terms, corpus) {
  const idf = {}
  const totalDocs = corpus.length
  
  terms.forEach(term => {
    const docsWithTerm = corpus.filter(doc => 
      tokenize(doc).includes(term)
    ).length
    
    idf[term] = Math.log(totalDocs / (docsWithTerm + 1))
  })
  
  return idf
}

// Create TF-IDF vector from multiple documents
export function createTFIDFVector(documents) {
  const vectors = documents.map(doc => calculateTFIDF(doc, documents))
  return vectors
}
