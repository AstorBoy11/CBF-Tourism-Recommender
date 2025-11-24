import DestinationCard from './DestinationCard'

function DestinationSimilar({ destinations }) {
  return (
    <div className="similar-destinations">
      <h2>Similar Destinations</h2>
      <div className="similar-list">
        {destinations?.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  )
}

export default DestinationSimilar
