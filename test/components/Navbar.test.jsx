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

  test('renders hamburger menu button', () => {
    render(<Navbar />)
    
    const hamburger = screen.getByText('☰')
    expect(hamburger).toBeInTheDocument()
  })
})
