import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import DestinationPage from '@/app/destinations/page'

// Mock components
jest.mock('@/components/layout/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>
  }
})

jest.mock('@/components/DestinationModal', () => {
  return function MockDestinationModal({ destination, onClose }) {
    return destination ? (
      <div data-testid="modal">
        <h2>{destination.name}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  }
})

describe('Destinations Page', () => {
  test('renders the page with destinations list', () => {
    render(<DestinationPage />)
    
    expect(screen.getByText('Explore Destinations')).toBeInTheDocument()
    expect(screen.getByText('Bali Beach')).toBeInTheDocument()
    expect(screen.getByText('Mount Bromo')).toBeInTheDocument()
  })

  test('renders search input', () => {
    render(<DestinationPage />)
    
    const searchInput = screen.getByPlaceholderText('Search destinations...')
    expect(searchInput).toBeInTheDocument()
  })

  test('renders category filter buttons', () => {
    render(<DestinationPage />)
    
    expect(screen.getByText('all')).toBeInTheDocument()
    expect(screen.getByText('beach')).toBeInTheDocument()
    expect(screen.getByText('nature')).toBeInTheDocument()
  })

  test('handles search input change', () => {
    render(<DestinationPage />)
    
    const searchInput = screen.getByPlaceholderText('Search destinations...')
    fireEvent.change(searchInput, { target: { value: 'Bali' } })
    
    expect(searchInput.value).toBe('Bali')
  })

  test('opens modal when View Details button is clicked', async () => {
    render(<DestinationPage />)
    
    const viewDetailsButtons = screen.getAllByText('View Details')
    fireEvent.click(viewDetailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
      expect(screen.getByText('Bali Beach')).toBeInTheDocument()
    })
  })

  test('displays destination ratings', () => {
    render(<DestinationPage />)
    
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('4.8')).toBeInTheDocument()
  })

  test('shows destination images', () => {
    render(<DestinationPage />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })
})
