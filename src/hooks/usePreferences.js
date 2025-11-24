import { useState, useEffect } from 'react'

export function usePreferences(userId) {
  const [preferences, setPreferences] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPreferences()
  }, [userId])

  const fetchPreferences = async () => {
    setIsLoading(true)
    try {
      // TODO: Fetch from API
      // const data = await apiClient.get(`/users/${userId}/preferences`)
      
      // Check localStorage for now
      const stored = localStorage.getItem(`preferences_${userId}`)
      if (stored) {
        setPreferences(JSON.parse(stored))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreferences = async (newPreferences) => {
    try {
      // TODO: Update via API
      // await apiClient.put(`/users/${userId}/preferences`, newPreferences)
      
      // Store locally for now
      localStorage.setItem(`preferences_${userId}`, JSON.stringify(newPreferences))
      setPreferences(newPreferences)
      
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    refreshPreferences: fetchPreferences
  }
}
