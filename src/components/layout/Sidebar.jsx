import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/destinations">🗺️ Destinations</Link></li>
        <li><Link to="/explore-map">📍 Explore Map</Link></li>
        <li><Link to="/preferences">⚙️ Preferences</Link></li>
        <li><Link to="/evaluation">📊 Evaluation</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar
