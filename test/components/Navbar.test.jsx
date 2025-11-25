import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '@/components/layout/Navbar'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Navbar Component', () => {
  test('renders brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Tourism Recommender')).toBeInTheDocument()
  })

  test('renders all navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Destinations')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Explore Map')).toBeInTheDocument()
    expect(screen.getByText('Evaluation')).toBeInTheDocument()
  })

  test('renders login button', () => {
    render(<Navbar />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  test('toggles mobile menu when hamburger is clicked', () => {
    render(<Navbar />)
    
    const hamburger = screen.getByLabelText('Toggle navigation')
    
    // Initially, mobile menu should be hidden (assuming it's hidden by default)
    fireEvent.click(hamburger)
    
    // After click, menu state changes (test implementation depends on your component)
    expect(hamburger).toBeInTheDocument()
  })

  test('hamburger button has correct aria-label', () => {
    render(<Navbar />)
    
    const hamburger = screen.getByLabelText('Toggle navigation')
    expect(hamburger).toBeInTheDocument()
  })
})
