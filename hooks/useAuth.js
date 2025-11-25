import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in (check localStorage or session)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // TODO: Call API to authenticate
      // const response = await apiClient.post('/auth/login', credentials)
      
      // Mock user for now
      const mockUser = {
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  const register = async (userData) => {
    try {
      // TODO: Call API to register user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register
  }
}
