import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1976d2',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Tourism Recommender
        </Link>
      </div>
      
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.5rem',
        }}
        className="hamburger-menu"
      >
        ☰
      </button>

      {/* Desktop Menu */}
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '2rem',
        margin: 0,
        padding: 0
      }}
      className="desktop-menu"
      >
        <li>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/destinations" style={{ color: 'white', textDecoration: 'none' }}>
            Destinations
          </Link>
        </li>
        <li>
          <Link to="/explore-map" style={{ color: 'white', textDecoration: 'none' }}>
            Explore Map
          </Link>
        </li>
        <li>
          <Link to="/preferences" style={{ color: 'white', textDecoration: 'none' }}>
            Preferences
          </Link>
        </li>
        <li>
          <Link to="/evaluation" style={{ color: 'white', textDecoration: 'none' }}>
            Evaluation
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul style={{
          display: 'none',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#1976d2',
          listStyle: 'none',
          padding: '1rem',
          margin: 0,
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
        className="mobile-menu"
        >
          <li>
            <Link 
              to="/dashboard" 
              style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '0.5rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/destinations" 
              style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '0.5rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link 
              to="/explore-map" 
              style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '0.5rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Map
            </Link>
          </li>
          <li>
            <Link 
              to="/preferences" 
              style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '0.5rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Preferences
            </Link>
          </li>
          <li>
            <Link 
              to="/evaluation" 
              style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '0.5rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Evaluation
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                display: 'block', 
                padding: '0.5rem',
                border: '1px solid white',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
      
      <div className="desktop-login">
        <Link to="/login" style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          border: '1px solid white',
          borderRadius: '4px'
        }}>
          Login
        </Link>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .hamburger-menu {
              display: block !important;
            }
            .desktop-menu {
              display: none !important;
            }
            .desktop-login {
              display: none !important;
            }
            .mobile-menu {
              display: flex !important;
            }
          }
        `}
      </style>
    </nav>
  )
}

export default Navbar
