import { Link } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";
import { Button } from "@mui/material";

function LandingPage() {
  const handleSearch = (query) => {
    console.log("Search:", query);
    // TODO: Implement search logic
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Discover Your Perfect Destination</h1>
        <p>Personalized tourism recommendations based on your preferences</p>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search destinations..."
        />
        <div className="cta-buttons">
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            sx={{ padding: "12px 32px", margin: "0 16px 0 0" }}
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/destinations"
            variant="outlined"
            color="secondary"
            sx={{ padding: "12px 32px", backgroundColor: "tomato" }}
          >
            Explore Now
          </Button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎯 Personalized</h3>
            <p>Get recommendations tailored to your preferences</p>
          </div>
          <div className="feature-card">
            <h3>🗺️ Interactive Maps</h3>
            <p>Explore destinations with integrated maps</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Smart Algorithm</h3>
            <p>Content-based filtering for accurate suggestions</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
