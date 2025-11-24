import AppRouter from './router'
import { AuthProvider } from './context/AuthContext'
import { UserPreferenceProvider } from './context/UserPreferenceContext'
import { RecommendationProvider } from './context/RecommendationContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <UserPreferenceProvider>
        <RecommendationProvider>
          <AppRouter />
        </RecommendationProvider>
      </UserPreferenceProvider>
    </AuthProvider>
  )
}

export default App
