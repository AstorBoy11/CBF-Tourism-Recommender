import DestinationCard from '../destinations/DestinationCard'

function RecommendationList({ recommendations }) {
  return (
    <div className="recommendation-list">
      <h2>Your Personalized Recommendations</h2>
      <div className="recommendations-grid">
        {recommendations?.map((item) => (
          <div key={item.id} className="recommendation-item">
            <DestinationCard destination={item} />
            <div className="recommendation-meta">
              <span className="similarity-score">
                Match: {Math.round(item.similarity * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationList
