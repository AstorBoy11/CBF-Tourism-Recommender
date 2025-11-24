import PageContainer from '../components/layout/PageContainer'
import MetricsCard from '../components/evaluation/MetricsCard'
import ChartPlaceholder from '../components/evaluation/ChartPlaceholder'

function EvaluationPage() {
  // Mock evaluation metrics
  const metrics = {
    precision: '0.85',
    recall: '0.78',
    f1Score: '0.81',
    diversity: '0.73'
  }

  return (
    <PageContainer>
      <div className="evaluation-page">
        <h1>System Evaluation</h1>
        <p>Performance metrics of the recommendation system</p>

        <div className="metrics-grid">
          <MetricsCard 
            title="Precision" 
            value={metrics.precision}
            description="Accuracy of recommendations"
          />
          <MetricsCard 
            title="Recall" 
            value={metrics.recall}
            description="Coverage of relevant items"
          />
          <MetricsCard 
            title="F1 Score" 
            value={metrics.f1Score}
            description="Harmonic mean of precision and recall"
          />
          <MetricsCard 
            title="Diversity" 
            value={metrics.diversity}
            description="Variety in recommendations"
          />
        </div>

        <div className="charts-section">
          <ChartPlaceholder title="Precision & Recall Over Time" type="line" />
          <ChartPlaceholder title="Category Distribution" type="pie" />
          <ChartPlaceholder title="User Satisfaction" type="bar" />
        </div>
      </div>
    </PageContainer>
  )
}

export default EvaluationPage
