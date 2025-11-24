function SimilarityBadge({ score }) {
  const getColor = (score) => {
    if (score >= 0.8) return 'high'
    if (score >= 0.6) return 'medium'
    return 'low'
  }

  return (
    <span className={`similarity-badge ${getColor(score)}`}>
      {Math.round(score * 100)}% Match
    </span>
  )
}

export default SimilarityBadge
