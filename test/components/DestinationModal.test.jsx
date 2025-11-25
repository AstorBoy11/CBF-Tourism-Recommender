import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DestinationModal from '@/components/DestinationModal'

describe('DestinationModal Component', () => {
  const mockDestination = {
    id: 1,
    name: 'Bali Beach',
    location: 'Bali, Indonesia',
    description: 'Beautiful tropical paradise with crystal clear waters',
    image: 'https://example.com/image.jpg',
    rating: 4.5,
    category: 'beach',
    facilities: ['Restroom', 'Parking Area', 'Restaurant'],
    operatingHours: '24 Hours',
    price: 'Free',
    latitude: -8.7467,
    longitude: 115.1688,
    similar: [
      {
        id: 2,
        name: 'Nusa Dua Beach',
        location: 'Bali, Indonesia',
        image: 'https://example.com/nusa.jpg',
        rating: 4.6,
      },
    ],
  }

  const mockOnClose = jest.fn()

  test('renders destination name and location', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText('Bali Beach')).toBeInTheDocument()
    expect(screen.getAllByText('Bali, Indonesia')[0]).toBeInTheDocument()
  })

  test('displays rating correctly', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  test('shows category badge', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText('beach')).toBeInTheDocument()
  })

  test('renders description', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText(/Beautiful tropical paradise/)).toBeInTheDocument()
  })

  test('displays all facilities', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText('Restroom')).toBeInTheDocument()
    expect(screen.getByText('Parking Area')).toBeInTheDocument()
    expect(screen.getByText('Restaurant')).toBeInTheDocument()
  })

  test('shows operating hours and price', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText('24 Hours')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  test('renders similar destinations section', () => {
    render(<DestinationModal destination={mockDestination} onClose={mockOnClose} />)
    
    expect(screen.getByText('Destinasi Serupa')).toBeInTheDocument()
    expect(screen.getByText('Nusa Dua Beach')).toBeInTheDocument()
  })

  test('returns null when destination is not provided', () => {
    const { container } = render(<DestinationModal destination={null} onClose={mockOnClose} />)
    
    expect(container.firstChild).toBeNull()
  })
})
