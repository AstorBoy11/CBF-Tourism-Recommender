import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search:", searchQuery);
    // TODO: Implement search logic
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Discover Your Perfect Destination
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Personalized tourism recommendations based on your preferences
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'stretch', maxWidth: '600px', margin: '0 auto 2rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations..."
            style={{ 
              padding: '10px 16px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px 0 0 4px',
              outline: 'none',
              flex: 1
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              borderRadius: '0 4px 4px 0',
              minWidth: '100px',
              fontSize: '16px',
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': { bgcolor: '#f0f0f0' }
            }}
          >
            Search
          </Button>
        </form>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{ 
              padding: "12px 32px",
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': { bgcolor: '#f0f0f0' }
            }}
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/destinations"
            variant="outlined"
            sx={{ 
              padding: "12px 32px",
              borderColor: 'white',
              color: 'white',
              '&:hover': { borderColor: '#f0f0f0', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Explore Now
          </Button>
        </div>
      </section>

      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#333' }}>
          Why Choose Us?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{
            padding: '2rem',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>
              🎯 Personalized
            </h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Get recommendations tailored to your preferences
            </p>
          </div>
          <div style={{
            padding: '2rem',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>
              🗺️ Interactive Maps
            </h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Explore destinations with integrated maps
            </p>
          </div>
          <div style={{
            padding: '2rem',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#667eea' }}>
              ⚡ Smart Algorithm
            </h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Content-based filtering for accurate suggestions
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
