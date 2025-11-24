function ChartPlaceholder({ title, type = 'bar' }) {
  return (
    <div className="chart-placeholder">
      <h3>{title}</h3>
      <div className="chart-area">
        <p>📊 {type.toUpperCase()} Chart</p>
        <p className="chart-hint">Chart visualization will be displayed here</p>
        {/* TODO: Integrate chart library (e.g., Chart.js, Recharts) */}
      </div>
    </div>
  )
}

export default ChartPlaceholder
