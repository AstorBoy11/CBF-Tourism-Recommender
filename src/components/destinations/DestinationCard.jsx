import { Link } from 'react-router-dom'
import Card from '../ui/Card'

function DestinationCard({ destination }) {
  return (
    <Card className="destination-card">
      <img src={destination.image} alt={destination.name} />
      <div className="card-content">
        <h3>{destination.name}</h3>
        <p>{destination.location}</p>
        <p className="description">{destination.description}</p>
        <div className="card-footer">
          <span className="rating">⭐ {destination.rating}</span>
          <Link to={`/destination/${destination.id}`}>View Details</Link>
        </div>
      </div>
    </Card>
  )
}

export default DestinationCard
