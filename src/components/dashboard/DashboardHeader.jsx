function DashboardHeader({ userName }) {
  return (
    <div className="dashboard-header">
      <h1>Welcome back, {userName}!</h1>
      <p>Discover your next adventure</p>
    </div>
  )
}

export default DashboardHeader
