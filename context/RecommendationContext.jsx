'use client'

import { createContext, useContext, useState } from 'react'

const RecommendationContext = createContext(null)

export function RecommendationProvider({ children }) {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecommendations = async (userId, preferences) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // TODO: Call API to get recommendations
      // const data = await apiClient.post('/recommendations', { userId, preferences })
      
      // Mock data for now
      setRecommendations([])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshRecommendations = () => {
    // Re-fetch recommendations with current preferences
    console.log('Refreshing recommendations...')
  }

  const value = {
    recommendations,
    isLoading,
    error,
    fetchRecommendations,
    refreshRecommendations
  }

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  )
}

export function useRecommendations() {
  const context = useContext(RecommendationContext)
  if (!context) {
    throw new Error('useRecommendations must be used within RecommendationProvider')
  }
  return context
}

export default RecommendationContext
