'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import { FaStar } from 'react-icons/fa'
import Navbar from '@/components/layout/Navbar'
import DestinationModal from '@/components/DestinationModal'

export default function DestinationPage() {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: 'Bali Beach',
      location: 'Bali, Indonesia',
      description: 'Beautiful tropical paradise with crystal clear waters, white sandy beaches, and stunning sunsets. Perfect for relaxation and water activities.',
      image: 'https://i2.wp.com/blog.tripcetera.com/id/wp-content/uploads/2020/03/leebudihart_76864081_2484833498431751_3194446755026370817_n.jpg',
      rating: 4.5,
      category: 'beach',
      facilities: ['Restroom', 'Parking Area', 'Restaurant', 'Water Sports', 'Lifeguard'],
      operatingHours: '24 Hours',
      price: 'Free',
      latitude: -8.7467,
      longitude: 115.1688,
      similar: [
        {
          id: 3,
          name: 'Nusa Dua Beach',
          location: 'Bali, Indonesia',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/d8/3e/3d/nusa-dua-beach.jpg',
          rating: 4.6
        },
        {
          id: 4,
          name: 'Seminyak Beach',
          location: 'Bali, Indonesia',
          image: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/bali-nusa-tenggara/bali/seminyak/image1.jpg',
          rating: 4.4
        },
        {
          id: 5,
          name: 'Sanur Beach',
          location: 'Bali, Indonesia',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f5/d9/sanur-beach.jpg',
          rating: 4.3
        }
      ]
    },
    {
      id: 2,
      name: 'Mount Bromo',
      location: 'East Java, Indonesia',
      description: 'Stunning volcanic landscape with breathtaking sunrise views. One of the most iconic natural wonders in Indonesia, featuring a massive crater and surrounding sea of sand.',
      image: 'https://unesco.or.id/wp-content/uploads/2025/09/Gunung-Bromo.jpg',
      rating: 4.8,
      category: 'nature',
      facilities: ['Viewpoint', 'Parking Area', 'Horse Rental', 'Jeep Rental', 'Restroom'],
      operatingHours: '00:00 - 12:00',
      price: 'Rp 35,000 - Rp 220,000',
      latitude: -7.9425,
      longitude: 112.9531,
      similar: [
        {
          id: 6,
          name: 'Mount Ijen',
          location: 'East Java, Indonesia',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/82/58/0f/blue-fire.jpg',
          rating: 4.7
        },
        {
          id: 7,
          name: 'Mount Merapi',
          location: 'Yogyakarta, Indonesia',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/f5/3e/8f/mount-merapi.jpg',
          rating: 4.6
        },
        {
          id: 8,
          name: 'Mount Rinjani',
          location: 'Lombok, Indonesia',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4c/a5/3e/mount-rinjani.jpg',
          rating: 4.9
        }
      ]
    },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const handleFilterChange = (category) => {
    setSelectedCategory(category)
    console.log('Filter:', category)
  }

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDestination(null)
  }

  return (
    <>
      <Navbar />
      <div
        style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#1e3a8a',
          }}
        >
          Explore Destinations
        </h1>

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
              fontSize: '16px',
            }}
          />
        </form>

        {/* Filter Bar */}
        <div
          style={{
            marginBottom: '30px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {['all', 'beach', 'nature', 'culture', 'adventure'].map(
            (category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? 'contained' : 'outlined'
                }
                onClick={() => handleFilterChange(category)}
                sx={{ 
                  textTransform: 'capitalize',
                  bgcolor: selectedCategory === category ? '#667eea' : 'transparent',
                  color: selectedCategory === category ? 'white' : '#667eea',
                  borderColor: '#667eea',
                  '&:hover': {
                    bgcolor: selectedCategory === category ? '#556cd6' : 'rgba(102, 126, 234, 0.1)',
                    borderColor: '#667eea'
                  }
                }}
              >
                {category}
              </Button>
            )
          )}
        </div>

        {/* Destination List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {destinations.map((dest) => (
            <div
              key={dest.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                  }}
                >
                  {dest.name}
                </h3>
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    marginBottom: '8px',
                  }}
                >
                  {dest.location}
                </p>
                <p style={{ color: '#374151', marginBottom: '12px' }}>
                  {dest.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: '#f59e0b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaStar /> {dest.rating}
                  </span>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewDetails(dest)}
                    sx={{
                      bgcolor: '#667eea',
                      '&:hover': { bgcolor: '#556cd6' },
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
