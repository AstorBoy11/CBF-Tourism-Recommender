import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'
import PageContainer from '../components/layout/PageContainer'

function RegisterPage() {
  const navigate = useNavigate()

  const handleRegister = (userData) => {
    console.log('Register:', userData)
    // TODO: Implement registration logic with API
    navigate('/preferences')
  }

  return (
    <PageContainer>
      <div className="register-page" style={{ backgroundColor: 'white' }}>
        <div className="register-container">
          <h1 style={{ color: 'black' }}>Create Account</h1>
          <RegisterForm onSubmit={handleRegister} />
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </PageContainer>
  )
}

export default RegisterPage
