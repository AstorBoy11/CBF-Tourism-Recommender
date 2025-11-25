'use client'

import Navbar from '@/components/layout/Navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>About Us</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
          This is a Content-Based Filtering Tourism Recommendation System designed to help you discover
          your perfect travel destination based on your preferences and past interactions.
        </p>
      </div>
    </>
  )
}
