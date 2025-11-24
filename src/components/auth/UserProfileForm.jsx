import { useState } from 'react'

function UserProfileForm({ user, onUpdate }) {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferences: user?.preferences || []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(profile)
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={profile.name}
          onChange={(e) => setProfile({...profile, name: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={profile.email}
          onChange={(e) => setProfile({...profile, email: e.target.value})}
        />
      </div>

      <button type="submit">Update Profile</button>
    </form>
  )
}

export default UserProfileForm
