import DestinationCard from './DestinationCard'

function DestinationList({ destinations }) {
  return (
    <div className="destination-list">
      {destinations?.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  )
}

export default DestinationList
