import { useParams } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import DestinationDetail from '../components/destinations/DestinationDetail'
import DestinationSimilar from '../components/destinations/DestinationSimilar'

function DestinationDetailPage() {
  const { id } = useParams()

  // Mock data - replace with API call
  const destination = {
    id: id,
    name: 'Bali Beach',
    location: 'Bali, Indonesia',
    description: 'Bali is a beautiful tropical paradise known for its stunning beaches, vibrant culture, and warm hospitality.',
    image: 'https://via.placeholder.com/800x400',
    rating: 4.5,
    category: 'Beach',
    priceRange: 'Medium',
    latitude: -8.3405,
    longitude: 115.0920
  }

  const similarDestinations = [
    // Mock similar destinations
  ]

  return (
    <PageContainer>
      <div className="destination-detail-page">
        <DestinationDetail destination={destination} />
        <DestinationSimilar destinations={similarDestinations} />
      </div>
    </PageContainer>
  )
}

export default DestinationDetailPage
