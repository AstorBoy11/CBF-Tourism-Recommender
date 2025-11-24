import { useState, useEffect } from 'react'
import similarityService from '../services/similarityService'

export function useRecommendation(userId) {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecommendations = async (preferences, diversityFactor = 0.3) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // TODO: Fetch from API
      // const data = await apiClient.post('/recommendations', {
      //   userId,
      //   preferences,
      //   diversityFactor
      // })
      
      // Mock recommendations for now
      const mockRecommendations = []
      
      setRecommendations(mockRecommendations)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getSimilarDestinations = (destination, allDestinations, topN = 5) => {
    return similarityService.findSimilar(destination, allDestinations, topN)
  }

  return {
    recommendations,
    isLoading,
    error,
    fetchRecommendations,
    getSimilarDestinations
  }
}
