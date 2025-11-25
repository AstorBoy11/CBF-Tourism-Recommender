'use client'

import Navbar from '@/components/layout/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Home Page</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
          Welcome to CBF Tourism Recommender
        </p>
      </div>
    </>
  )
}
