import DestinationCard from '../destinations/DestinationCard'

function TrendingDestination({ destinations }) {
  return (
    <div className="trending-destinations">
      <h2>🔥 Trending Now</h2>
      <div className="trending-list">
        {destinations?.slice(0, 5).map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  )
}

export default TrendingDestination
