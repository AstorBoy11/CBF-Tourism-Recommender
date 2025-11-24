import { useState } from 'react'

function DiversityController({ onDiversityChange, initialValue = 0.3 }) {
  const [diversity, setDiversity] = useState(initialValue)

  const handleChange = (e) => {
    const value = parseFloat(e.target.value)
    setDiversity(value)
    onDiversityChange(value)
  }

  return (
    <div className="diversity-controller">
      <label>
        Diversity Level: {Math.round(diversity * 100)}%
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={diversity}
        onChange={handleChange}
      />
      <p className="diversity-hint">
        Higher diversity shows more varied recommendations
      </p>
    </div>
  )
}

export default DiversityController
