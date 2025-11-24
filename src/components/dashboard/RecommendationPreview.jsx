import Card from '../ui/Card'

function RecommendationPreview({ recommendations }) {
  return (
    <div className="recommendation-preview">
      <h2>Recommended for You</h2>
      <div className="preview-list">
        {recommendations?.slice(0, 3).map((item) => (
          <Card key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RecommendationPreview
