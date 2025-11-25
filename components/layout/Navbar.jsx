'use client'

import Link from 'next/link'
import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [hoveredButton, setHoveredButton] = useState(false)
  const [hoveredLoginBtn, setHoveredLoginBtn] = useState(false)

  const linkStyle = (isHovered) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    display: 'inline-block',
  })

  const hamburgerStyle = {
    display: 'none',
    background: hoveredButton ? 'rgba(255, 255, 255, 0.2)' : 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  }

  const loginBtnStyle = {
    color: hoveredLoginBtn ? '#667eea' : 'white',
    backgroundColor: hoveredLoginBtn ? 'white' : 'transparent',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    border: '1px solid white',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  }

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#667eea',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', whiteSpace: 'nowrap', flexShrink: 0 }}>
        <Link 
          href="/" 
          style={linkStyle(hoveredLink === 'brand')}
          onMouseEnter={() => setHoveredLink('brand')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Tourism Recommender
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={() => setHoveredButton(true)}
        onMouseLeave={() => setHoveredButton(false)}
        style={hamburgerStyle}
        className="hamburger-menu"
      >
        ☰
      </button>

      {/* Desktop Menu */}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "1.5rem",
          margin: 0,
          padding: 0,
          flexWrap: "wrap",
        }}
        className="desktop-menu"
      >
        <li>
          <Link
            href="/dashboard"
            style={linkStyle(hoveredLink === 'dashboard')}
            onMouseEnter={() => setHoveredLink('dashboard')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/destinations"
            style={linkStyle(hoveredLink === 'destinations')}
            onMouseEnter={() => setHoveredLink('destinations')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Destinations
          </Link>
        </li>
        <li>
          <Link
            href="/explore-map"
            style={linkStyle(hoveredLink === 'explore-map')}
            onMouseEnter={() => setHoveredLink('explore-map')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Explore Map
          </Link>
        </li>
        <li>
          <Link
            href="/preferences"
            style={linkStyle(hoveredLink === 'preferences')}
            onMouseEnter={() => setHoveredLink('preferences')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Preferences
          </Link>
        </li>
        <li>
          <Link
            href="/evaluation"
            style={linkStyle(hoveredLink === 'evaluation')}
            onMouseEnter={() => setHoveredLink('evaluation')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Evaluation
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            style={linkStyle(hoveredLink === 'about')}
            onMouseEnter={() => setHoveredLink('about')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            About
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul
          style={{
            display: "none",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#667eea",
            listStyle: "none",
            padding: "1rem",
            margin: 0,
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
          className="mobile-menu"
        >
          <li>
            <Link
              href="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/destinations"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              href="/explore-map"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Map
            </Link>
          </li>
          <li>
            <Link
              href="/preferences"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Preferences
            </Link>
          </li>
          <li>
            <Link
              href="/evaluation"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Evaluation
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
                border: "1px solid white",
                borderRadius: "4px",
                textAlign: "center",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}

      <div className="desktop-login">
        <Link
          href="/login"
          style={loginBtnStyle}
          onMouseEnter={() => setHoveredLoginBtn(true)}
          onMouseLeave={() => setHoveredLoginBtn(false)}
        >
          Login
        </Link>
      </div>

      <style jsx>
        {`
          @media (max-width: 968px) {
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
          
          @media (max-width: 768px) {
            nav {
              padding: 0.75rem 1rem !important;
            }
          }
        `}
      </style>
    </nav>
  )
}

export default Navbar
