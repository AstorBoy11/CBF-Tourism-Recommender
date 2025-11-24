import { useState } from 'react'

function PreferenceForm({ onSubmit, initialPreferences = {} }) {
  const [preferences, setPreferences] = useState({
    categories: initialPreferences.categories || [],
    priceRange: initialPreferences.priceRange || 'medium',
    activities: initialPreferences.activities || []
  })

  const handleCategoryToggle = (category) => {
    const updated = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category]
    
    setPreferences({...preferences, categories: updated})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(preferences)
  }

  return (
    <form onSubmit={handleSubmit} className="preference-form">
      <div className="form-section">
        <h3>Favorite Categories</h3>
        <div className="checkbox-group">
          {['Nature', 'Culture', 'Adventure', 'Beach', 'Mountain'].map(cat => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={preferences.categories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3>Price Range</h3>
        <select 
          value={preferences.priceRange}
          onChange={(e) => setPreferences({...preferences, priceRange: e.target.value})}
        >
          <option value="low">Low Budget</option>
          <option value="medium">Medium</option>
          <option value="high">Premium</option>
        </select>
      </div>

      <button type="submit">Save Preferences</button>
    </form>
  )
}

export default PreferenceForm
