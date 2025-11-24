import PageContainer from '../components/layout/PageContainer'
import FilterBar from '../components/ui/FilterBar'
import DestinationMap from '../components/destinations/DestinationMap'

function ExploreMapPage() {
  const handleFilterChange = (filterType, value) => {
    console.log('Filter:', filterType, value)
    // TODO: Filter destinations on map
  }

  return (
    <PageContainer>
      <div className="explore-map-page">
        <h1>Explore Map</h1>
        
        <FilterBar onFilterChange={handleFilterChange} />

        <div className="map-container">
          <DestinationMap lat={-8.3405} lng={115.0920} />
        </div>

        <div className="map-info">
          <p>Click on markers to view destination details</p>
        </div>
      </div>
    </PageContainer>
  )
}

export default ExploreMapPage
