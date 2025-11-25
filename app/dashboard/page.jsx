'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { BsPinMapFill, BsSuitHeartFill, BsStarFill, BsPersonFillGear, BsMap } from 'react-icons/bs'
import Navbar from '@/components/layout/Navbar'

export default function DashboardPage() {
  const router = useRouter()

  // Mock data
  const userName = 'User'
  const recommendations = [
    { id: 1, name: 'Bali Beach', description: 'Beautiful tropical paradise' },
    { id: 2, name: 'Mount Bromo', description: 'Stunning volcanic landscape' },
    { id: 3, name: 'Raja Ampat', description: 'World-class diving destination' }
  ]

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#333' }}>
            Welcome back, {userName}!
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Discover your next adventure
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { title: 'Visited Places', value: '12', icon: <BsPinMapFill /> },
            { title: 'Favorites', value: '8', icon: <BsSuitHeartFill /> },
            { title: 'Recommendations', value: '24', icon: <BsStarFill /> }
          ].map((stat, index) => (
            <div key={index} style={{
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              onClick={() => router.push('/destinations')}
              sx={{ 
                backgroundColor: '#667eea', 
                '&:hover': { backgroundColor: '#5568d3' },
                padding: '12px 24px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <BsMap /> Explore Destinations
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => router.push('/explore-map')}
              sx={{ 
                color: '#ff6b6b', 
                borderColor: '#ff6b6b',
                '&:hover': { borderColor: '#ee5a52', backgroundColor: '#fff5f5' },
                padding: '12px 24px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <BsPinMapFill /> View Map
            </Button>
            <Button 
              variant="text" 
              onClick={() => router.push('/preferences')}
              sx={{ 
                color: '#4ecdc4', 
                padding: '12px 24px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <BsPersonFillGear /> Update Preferences
            </Button>
          </div>
        </div>

        {/* Recommendations Preview */}
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Recommended for You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {recommendations.map((item) => (
              <div key={item.id} style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '8px', color: '#333' }}>{item.name}</h3>
                <p style={{ color: '#666', margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
