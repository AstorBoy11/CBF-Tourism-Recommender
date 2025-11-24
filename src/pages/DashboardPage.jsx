import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Navbar from '../components/layout/Navbar'

function DashboardPage() {
  const navigate = useNavigate()

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
            { title: 'Visited Places', value: '12', icon: '📍' },
            { title: 'Favorites', value: '8', icon: '❤️' },
            { title: 'Recommendations', value: '24', icon: '🎯' }
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
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/destinations')}
              sx={{ 
                backgroundColor: '#667eea', 
                '&:hover': { backgroundColor: '#5568d3' },
                padding: '12px 24px'
              }}
            >
              🗺️ Explore Destinations
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/explore-map')}
              sx={{ 
                color: '#ff6b6b', 
                borderColor: '#ff6b6b',
                '&:hover': { borderColor: '#ee5a52', backgroundColor: '#fff5f5' },
                padding: '12px 24px'
              }}
            >
              📍 View Map
            </Button>
            <Button 
              variant="text" 
              onClick={() => navigate('/preferences')}
              sx={{ color: '#4ecdc4', padding: '12px 24px' }}
            >
              ⚙️ Update Preferences
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

export default DashboardPage
