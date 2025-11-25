'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials) => {
    // TODO: Implement login API call
    const mockUser = {
      id: 1,
      name: credentials.email.split('@')[0],
      email: credentials.email
    }
    
    localStorage.setItem('user', JSON.stringify(mockUser))
    setUser(mockUser)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const register = async (userData) => {
    // TODO: Implement register API call
    return { success: true }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export default AuthContext
