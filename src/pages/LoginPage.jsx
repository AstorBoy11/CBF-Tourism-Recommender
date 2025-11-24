import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import PageContainer from '../components/layout/PageContainer'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (credentials) => {
    console.log('Login:', credentials)
    // TODO: Implement login logic with API
    navigate('/dashboard')
  }

  return (
    <PageContainer>
      <div className="login-page">
        <div className="login-container">
          <h1>Login</h1>
          <LoginForm onSubmit={handleLogin} />
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </PageContainer>
  )
}

export default LoginPage
