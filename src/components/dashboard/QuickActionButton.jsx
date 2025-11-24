function QuickActionButton({ icon, label, onClick }) {
  return (
    <button className="quick-action-btn" onClick={onClick}>
      <span className="action-icon">{icon}</span>
      <span className="action-label">{label}</span>
    </button>
  )
}

export default QuickActionButton
