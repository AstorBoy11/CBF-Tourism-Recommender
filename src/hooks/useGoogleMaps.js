import { useState, useEffect } from 'react'
import googleMapsService from '../services/googleMapsService'

export function useGoogleMaps(elementId, center, zoom = 12) {
  const [map, setMap] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!elementId) return

    const initializeMap = async () => {
      try {
        const mapInstance = await googleMapsService.initMap(elementId, center, zoom)
        setMap(mapInstance)
        setIsLoaded(true)
      } catch (err) {
        setError(err.message)
        console.error('Failed to load Google Maps:', err)
      }
    }

    initializeMap()
  }, [elementId, center.lat, center.lng, zoom])

  const addMarker = (position, title) => {
    if (!map) return null
    return googleMapsService.addMarker(map, position, title)
  }

  const addMultipleMarkers = (locations) => {
    if (!map) return []
    return locations.map(loc => 
      googleMapsService.addMarker(map, loc.position, loc.title)
    )
  }

  return {
    map,
    isLoaded,
    error,
    addMarker,
    addMultipleMarkers
  }
}
