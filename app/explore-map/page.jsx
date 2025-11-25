'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import Navbar from '@/components/layout/Navbar'

export default function ExploreMapPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleFilterChange = (category) => {
    setSelectedCategory(category)
    console.log('Filter:', category)
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1e3a8a' }}>Explore Map</h1>
        
        {/* Filter Bar */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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

        {/* Map Container */}
        <div style={{ 
          width: '100%', 
          height: '600px', 
          backgroundColor: '#e5e7eb', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            Map component placeholder (lat: -8.3405, lng: 115.0920)
          </p>
        </div>

        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p>Click on markers to view destination details</p>
        </div>
      </div>
    </>
  )
}
