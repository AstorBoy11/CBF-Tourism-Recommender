import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Tourism Recommender</Link>
      </div>
      <ul className="nav-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/destinations">Destinations</Link></li>
        <li><Link to="/explore-map">Explore Map</Link></li>
        <li><Link to="/preferences">Preferences</Link></li>
        <li><Link to="/evaluation">Evaluation</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
