// Diversity Injection for recommendations
// Implements MMR (Maximal Marginal Relevance) algorithm

export function injectDiversity(recommendations, diversityFactor = 0.3, topN = 10) {
  if (recommendations.length === 0) return []
  
  const selected = []
  const remaining = [...recommendations]
  
  // Select the first item (highest similarity)
  selected.push(remaining.shift())
  
  // Select remaining items based on diversity
  while (selected.length < topN && remaining.length > 0) {
    let maxScore = -Infinity
    let maxIndex = 0
    
    // Calculate MMR score for each remaining item
    remaining.forEach((item, index) => {
      const relevance = item.similarity
      
      // Calculate diversity (minimum similarity to selected items)
      const maxSimilarityToSelected = Math.max(
        ...selected.map(selectedItem => 
          calculateItemSimilarity(item, selectedItem)
        )
      )
      
      // MMR formula
      const mmrScore = (1 - diversityFactor) * relevance - 
                       diversityFactor * maxSimilarityToSelected
      
      if (mmrScore > maxScore) {
        maxScore = mmrScore
        maxIndex = index
      }
    })
    
    // Add item with highest MMR score
    selected.push(remaining.splice(maxIndex, 1)[0])
  }
  
  return selected
}

// Calculate similarity between two items
function calculateItemSimilarity(item1, item2) {
  // Simple category-based similarity for now
  const categoryMatch = item1.category === item2.category ? 1 : 0
  const priceMatch = item1.priceRange === item2.priceRange ? 1 : 0
  
  return (categoryMatch + priceMatch) / 2
}

// Diversify by category distribution
export function diversifyByCategory(recommendations, targetDistribution = {}) {
  const categoryCounts = {}
  const diversified = []
  
  // Sort by similarity first
  const sorted = [...recommendations].sort((a, b) => b.similarity - a.similarity)
  
  sorted.forEach(item => {
    const category = item.category
    const currentCount = categoryCounts[category] || 0
    const targetCount = targetDistribution[category] || Infinity
    
    if (currentCount < targetCount) {
      diversified.push(item)
      categoryCounts[category] = currentCount + 1
    }
  })
  
  return diversified
}
