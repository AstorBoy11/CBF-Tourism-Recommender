import { useState } from 'react'
import { Button, Slider, Checkbox, FormControlLabel } from '@mui/material'
import Navbar from '../components/layout/Navbar'

function PreferencesPage() {
  const [diversity, setDiversity] = useState(0.3)
  const [preferences, setPreferences] = useState({
    beach: false,
    nature: false,
    culture: false,
    adventure: false,
    budget: 'medium'
  })

  const handlePreferencesSubmit = (e) => {
    e.preventDefault()
    console.log('Preferences updated:', preferences)
  }

  const handleCheckboxChange = (category) => {
    setPreferences(prev => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1e3a8a' }}>Your Preferences</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Customize your recommendation settings</p>

        {/* Travel Preferences */}
        <section style={{ marginBottom: '40px', padding: '24px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Travel Preferences</h2>
          <form onSubmit={handlePreferencesSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500' }}>Categories</label>
              {['beach', 'nature', 'culture', 'adventure'].map(category => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox 
                      checked={preferences[category]}
                      onChange={() => handleCheckboxChange(category)}
                    />
                  }
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  style={{ display: 'block', marginBottom: '8px' }}
                />
              ))}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500' }}>Budget</label>
              <select 
                value={preferences.budget}
                onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="low">Low Budget</option>
                <option value="medium">Medium Budget</option>
                <option value="high">High Budget</option>
              </select>
            </div>

            <Button variant="contained" type="submit" fullWidth>
              Save Preferences
            </Button>
          </form>
        </section>

        {/* Recommendation Settings */}
        <section style={{ padding: '24px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Recommendation Settings</h2>
          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500' }}>
              Diversity Level: {diversity.toFixed(2)}
            </label>
            <Slider 
              value={diversity}
              onChange={(e, newValue) => setDiversity(newValue)}
              min={0}
              max={1}
              step={0.1}
              marks
              valueLabelDisplay="auto"
            />
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '12px' }}>
              Higher diversity shows more varied recommendations
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default PreferencesPage
