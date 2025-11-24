import { useState } from 'react'
import { Button } from '@mui/material'
import Navbar from '../components/layout/Navbar'

function DestinationPage() {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: 'Bali Beach',
      location: 'Bali, Indonesia',
      description: 'Beautiful tropical paradise',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.5,
      category: 'beach'
    },
    {
      id: 2,
      name: 'Mount Bromo',
      location: 'East Java, Indonesia',
      description: 'Stunning volcanic landscape',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.8,
      category: 'nature'
    }
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const handleFilterChange = (category) => {
    setSelectedCategory(category)
    console.log('Filter:', category)
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1e3a8a' }}>Explore Destinations</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
          <input 
            type="text" 
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 20px', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              fontSize: '16px'
            }}
          />
        </form>

        {/* Filter Bar */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['all', 'beach', 'nature', 'culture', 'adventure'].map(category => (
            <Button 
              key={category}
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange(category)}
              sx={{ textTransform: 'capitalize' }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Destination List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {destinations.map(dest => (
            <div key={dest.id} style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{dest.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{dest.location}</p>
                <p style={{ color: '#374151', marginBottom: '12px' }}>{dest.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>★ {dest.rating}</span>
                  <Button variant="contained" size="small">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DestinationPage
