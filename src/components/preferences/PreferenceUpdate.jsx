function PreferenceUpdate({ preferences, onUpdate }) {
  return (
    <div className="preference-update">
      <h3>Current Preferences</h3>
      <div className="preference-display">
        <p>Categories: {preferences?.categories?.join(', ')}</p>
        <p>Price Range: {preferences?.priceRange}</p>
      </div>
      <button onClick={onUpdate}>Update Preferences</button>
    </div>
  )
}

export default PreferenceUpdate
