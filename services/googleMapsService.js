// Google Maps Service
// This service will handle all Google Maps API interactions

class GoogleMapsService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    this.isLoaded = false
  }

  // Load Google Maps script
  loadScript() {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        this.isLoaded = true
        resolve()
      }
      
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  // Initialize map
  async initMap(elementId, center, zoom = 12) {
    await this.loadScript()
    
    const map = new google.maps.Map(document.getElementById(elementId), {
      center: center,
      zoom: zoom
    })
    
    return map
  }

  // Add marker
  addMarker(map, position, title) {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title
    })
  }

  // Geocode address
  async geocodeAddress(address) {
    // TODO: Implement geocoding
    console.log('Geocoding:', address)
  }
}

export default new GoogleMapsService()
