import DestinationMap from './DestinationMap'

function DestinationDetail({ destination }) {
  return (
    <div className="destination-detail">
      <div className="detail-header">
        <img src={destination?.image} alt={destination?.name} />
        <h1>{destination?.name}</h1>
        <p className="location">📍 {destination?.location}</p>
      </div>

      <div className="detail-content">
        <section>
          <h2>Description</h2>
          <p>{destination?.description}</p>
        </section>

        <section>
          <h2>Location</h2>
          <DestinationMap 
            lat={destination?.latitude} 
            lng={destination?.longitude}
          />
        </section>

        <section>
          <h2>Details</h2>
          <ul>
            <li>Rating: {destination?.rating} ⭐</li>
            <li>Category: {destination?.category}</li>
            <li>Price Range: {destination?.priceRange}</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default DestinationDetail
