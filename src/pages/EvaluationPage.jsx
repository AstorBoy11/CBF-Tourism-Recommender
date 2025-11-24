import Navbar from '../components/layout/Navbar'

function EvaluationPage() {
  const metrics = {
    precision: '0.85',
    recall: '0.78',
    f1Score: '0.81',
    diversity: '0.73'
  }

  const metricCards = [
    { title: 'Precision', value: metrics.precision, description: 'Accuracy of recommendations' },
    { title: 'Recall', value: metrics.recall, description: 'Coverage of relevant items' },
    { title: 'F1 Score', value: metrics.f1Score, description: 'Harmonic mean of precision and recall' },
    { title: 'Diversity', value: metrics.diversity, description: 'Variety in recommendations' }
  ]

  const charts = [
    { title: 'Precision & Recall Over Time', type: 'line' },
    { title: 'Category Distribution', type: 'pie' },
    { title: 'User Satisfaction', type: 'bar' }
  ]

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1e3a8a' }}>System Evaluation</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Performance metrics of the recommendation system</p>

        {/* Metrics Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          {metricCards.map(metric => (
            <div key={metric.title} style={{ 
              padding: '24px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                {metric.title}
              </h3>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>
                {metric.value}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {charts.map(chart => (
            <div key={chart.title} style={{ 
              padding: '24px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>{chart.title}</h3>
              <div style={{ 
                height: '250px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: '#9ca3af' }}>{chart.type} chart placeholder</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default EvaluationPage
