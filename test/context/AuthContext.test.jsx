import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AuthProvider, useAuthContext } from '@/context/AuthContext'

// Test component to use the context
function TestComponent() {
  const { user, isAuthenticated } = useAuthContext()
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      {user && <div data-testid="user-email">{user.email}</div>}
    </div>
  )
}

describe('AuthContext', () => {
  test('provides default unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated')
  })

  test('context can be consumed by child components', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('auth-status')).toBeInTheDocument()
  })
})
