import { useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <TextField fullWidth label="Full Name" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <TextField fullWidth label="Email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <TextField fullWidth label="Password" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <TextField fullWidth label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </div>

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
        Register</Button>
    </form>
  )
}

export default RegisterForm
