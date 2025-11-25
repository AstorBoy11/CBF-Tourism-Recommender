import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '@/app/page'

// Mock Navbar component
jest.mock('@/components/layout/Navbar', () => {
  return function MockNavbar() {
    return null
  }
})

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Home Page', () => {
  test('renders the page without crashing', () => {
    render(<HomePage />)
    expect(screen.getByText('Discover Your Perfect Destination')).toBeInTheDocument()
  })

  test('renders welcome heading', async () => {
    render(<HomePage />)
    
    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  test('contains call-to-action buttons', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Explore Now')).toBeInTheDocument()
  })
})
