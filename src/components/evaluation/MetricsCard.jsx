import Card from '../ui/Card'

function MetricsCard({ title, value, description }) {
  return (
    <Card className="metrics-card">
      <h3>{title}</h3>
      <div className="metric-value">{value}</div>
      <p className="metric-description">{description}</p>
    </Card>
  )
}

export default MetricsCard
