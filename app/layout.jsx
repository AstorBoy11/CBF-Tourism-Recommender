import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { UserPreferenceProvider } from '@/context/UserPreferenceContext'
import { RecommendationProvider } from '@/context/RecommendationContext'
import MUIProvider from '@/components/MUIProvider'

export const metadata = {
  title: 'Tourism Recommender - CBF System',
  description: 'Personalized tourism recommendations based on your preferences',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MUIProvider>
          <AuthProvider>
            <UserPreferenceProvider>
              <RecommendationProvider>
                {children}
              </RecommendationProvider>
            </UserPreferenceProvider>
          </AuthProvider>
        </MUIProvider>
      </body>
    </html>
  )
}
