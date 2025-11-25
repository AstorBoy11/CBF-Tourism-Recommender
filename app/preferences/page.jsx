'use client'

import { useState } from 'react'
import { Button, Slider, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Navbar from '@/components/layout/Navbar'

export default function PreferencesPage() {
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
              <FormControl fullWidth>
                <InputLabel id="categories-label">Categories</InputLabel>
                <Select
                  labelId="categories-label"
                  id="categories-select"
                  multiple
                  value={Object.keys(preferences).filter(key => preferences[key] && key !== 'budget')}
                  label="Categories"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setPreferences(prev => ({
                      ...prev,
                      beach: selected.includes('beach'),
                      nature: selected.includes('nature'),
                      culture: selected.includes('culture'),
                      adventure: selected.includes('adventure')
                    }));
                  }}
                  renderValue={(selected) => selected.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
                >
                  {['beach', 'nature', 'culture', 'adventure'].map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={preferences[category]} />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <FormControl fullWidth>
                <InputLabel id="budget-select-label">Budget</InputLabel>
                <Select
                  labelId="budget-select-label"
                  id="budget-select"
                  value={preferences.budget}
                  label="Budget"
                  onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                >
                  <MenuItem value="low">Low Budget</MenuItem>
                  <MenuItem value="medium">Medium Budget</MenuItem>
                  <MenuItem value="high">High Budget</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button variant="contained" type="submit" fullWidth sx={{backgroundColor: '#2cae20ff', ':hover': {backgroundColor: '#206415ff'}}}>
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
