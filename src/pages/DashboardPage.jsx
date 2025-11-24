import PageContainer from '../components/layout/PageContainer'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import StatsCard from '../components/dashboard/StatsCard'
import QuickActionButton from '../components/dashboard/QuickActionButton'
import RecommendationPreview from '../components/dashboard/RecommendationPreview'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function DashboardPage() {
  const navigate = useNavigate()

  // Mock data - replace with actual data from API
  const userName = 'User'
  const recommendations = [
    { id: 1, name: 'Bali Beach', description: 'Beautiful tropical paradise' },
    { id: 2, name: 'Mount Bromo', description: 'Stunning volcanic landscape' },
    { id: 3, name: 'Raja Ampat', description: 'World-class diving destination' }
  ]

  return (
    <PageContainer>
      <div className="dashboard-page">
        <DashboardHeader userName={userName} />
        
        <div className="stats-section">
          <StatsCard title="Visited Places" value="12" icon="📍" />
          <StatsCard title="Favorites" value="8" icon="❤️" />
          <StatsCard title="Recommendations" value="24" icon="🎯" />
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Button 
              variant="contained" 
              onClick={() => navigate('/destinations')}
              sx={{ 
                backgroundColor: '#667eea', 
                '&:hover': { backgroundColor: '#5568d3' } 
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
                '&:hover': { borderColor: '#ee5a52', backgroundColor: '#fff5f5' }
              }}
            >
              📍 View Map
            </Button>
            <Button 
              variant="text" 
              onClick={() => navigate('/preferences')}
              style={{ color: '#4ecdc4' }}
            >
              ⚙️ Update Preferences
            </Button>
          </div>
        </div>

        <RecommendationPreview recommendations={recommendations} />
      </div>
    </PageContainer>
  )
}

export default DashboardPage
