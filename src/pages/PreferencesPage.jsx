import { useState } from 'react'
import PageContainer from '../components/layout/PageContainer'
import PreferenceForm from '../components/preferences/PreferenceForm'
import DiversityController from '../components/preferences/DiversityController'

function PreferencesPage() {
  const [diversity, setDiversity] = useState(0.3)

  const handlePreferencesSubmit = (preferences) => {
    console.log('Preferences updated:', preferences)
    // TODO: Save preferences via API
  }

  const handleDiversityChange = (value) => {
    setDiversity(value)
    console.log('Diversity updated:', value)
    // TODO: Update diversity setting
  }

  return (
    <PageContainer>
      <div className="preferences-page">
        <h1>Your Preferences</h1>
        <p>Customize your recommendation settings</p>

        <div className="preferences-content">
          <section className="preference-section">
            <h2>Travel Preferences</h2>
            <PreferenceForm onSubmit={handlePreferencesSubmit} />
          </section>

          <section className="preference-section">
            <h2>Recommendation Settings</h2>
            <DiversityController 
              onDiversityChange={handleDiversityChange}
              initialValue={diversity}
            />
          </section>
        </div>
      </div>
    </PageContainer>
  )
}

export default PreferencesPage
