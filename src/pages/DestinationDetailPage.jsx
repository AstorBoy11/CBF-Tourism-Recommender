import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import Navbar from '../components/layout/Navbar'

function DestinationDetailPage() {
  const { id } = useParams()

  const destination = {
    id: id,
    name: 'Bali Beach',
    location: 'Bali, Indonesia',
    description: 'Bali is a beautiful tropical paradise known for its stunning beaches, vibrant culture, and warm hospitality.',
    image: 'https://via.placeholder.com/800x400',
    rating: 4.5,
    category: 'Beach',
    priceRange: 'Medium',
    latitude: -8.3405,
    longitude: 115.0920
  }

  const similarDestinations = [
    { id: 2, name: 'Nusa Dua', location: 'Bali', image: 'https://via.placeholder.com/300x200', rating: 4.3 },
    { id: 3, name: 'Sanur Beach', location: 'Bali', image: 'https://via.placeholder.com/300x200', rating: 4.4 }
  ]

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Destination Detail */}
        <div style={{ marginBottom: '48px' }}>
          <img 
            src={destination.image} 
            alt={destination.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '24px' }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#1e3a8a' }}>
                {destination.name}
              </h1>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '12px' }}>
                📍 {destination.location}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '8px' }}>
                ★ {destination.rating}
              </div>
              <span style={{ 
                padding: '6px 12px', 
                backgroundColor: '#dbeafe', 
                color: '#1e40af',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {destination.category}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151', marginBottom: '24px' }}>
            {destination.description}
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="contained" size="large">Book Now</Button>
            <Button variant="outlined" size="large">Add to Wishlist</Button>
          </div>
        </div>

        {/* Similar Destinations */}
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1e3a8a' }}>
            Similar Destinations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {similarDestinations.map(dest => (
              <div key={dest.id} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '12px', 
                overflow: 'hidden'
              }}>
                <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>{dest.name}</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{dest.location}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>★ {dest.rating}</span>
                    <Button variant="text" size="small">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DestinationDetailPage
