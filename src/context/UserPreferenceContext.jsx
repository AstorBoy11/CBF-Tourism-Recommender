import { createContext, useContext, useState, useEffect } from 'react'

const UserPreferenceContext = createContext(null)

export function UserPreferenceProvider({ children }) {
  const [preferences, setPreferences] = useState({
    categories: [],
    priceRange: 'medium',
    activities: [],
    diversityFactor: 0.3
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load preferences from localStorage or API
    const stored = localStorage.getItem('userPreferences')
    if (stored) {
      setPreferences(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const updatePreferences = (newPreferences) => {
    const updated = { ...preferences, ...newPreferences }
    setPreferences(updated)
    localStorage.setItem('userPreferences', JSON.stringify(updated))
  }

  const updateDiversity = (diversityFactor) => {
    updatePreferences({ diversityFactor })
  }

  const value = {
    preferences,
    isLoading,
    updatePreferences,
    updateDiversity
  }

  return (
    <UserPreferenceContext.Provider value={value}>
      {children}
    </UserPreferenceContext.Provider>
  )
}

export function useUserPreferences() {
  const context = useContext(UserPreferenceContext)
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferenceProvider')
  }
  return context
}

export default UserPreferenceContext
