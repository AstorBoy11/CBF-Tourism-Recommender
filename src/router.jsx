import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import DestinationPage from './pages/DestinationPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import PreferencesPage from './pages/PreferencesPage'
import ExploreMapPage from './pages/ExploreMapPage'
import EvaluationPage from './pages/EvaluationPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/destinations" element={<DestinationPage />} />
      <Route path="/destination/:id" element={<DestinationDetailPage />} />
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/explore-map" element={<ExploreMapPage />} />
      <Route path="/evaluation" element={<EvaluationPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  )
}

export default AppRouter
