import { useState } from 'react'
import PageContainer from '../components/layout/PageContainer'
import SearchBar from '../components/ui/SearchBar'
import FilterBar from '../components/ui/FilterBar'
import DestinationList from '../components/destinations/DestinationList'

function DestinationPage() {
  const [destinations, setDestinations] = useState([
    // Mock data - replace with API call
    {
      id: 1,
      name: 'Bali Beach',
      location: 'Bali, Indonesia',
      description: 'Beautiful tropical paradise',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.5,
      category: 'beach'
    },
    {
      id: 2,
      name: 'Mount Bromo',
      location: 'East Java, Indonesia',
      description: 'Stunning volcanic landscape',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.8,
      category: 'nature'
    }
  ])

  const handleSearch = (query) => {
    console.log('Searching for:', query)
    // TODO: Implement search with API
  }

  const handleFilterChange = (filterType, value) => {
    console.log('Filter:', filterType, value)
    // TODO: Implement filtering logic
  }

  return (
    <PageContainer>
      <div className="destination-page">
        <h1>Explore Destinations</h1>
        
        <div className="search-filter-section">
          <SearchBar onSearch={handleSearch} />
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        <DestinationList destinations={destinations} />
      </div>
    </PageContainer>
  )
}

export default DestinationPage
