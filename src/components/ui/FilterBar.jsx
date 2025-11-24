function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="filter-bar">
      <select 
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="filter-select"
      >
        <option value="">All Categories</option>
        <option value="nature">Nature</option>
        <option value="culture">Culture</option>
        <option value="adventure">Adventure</option>
        <option value="beach">Beach</option>
      </select>

      <select 
        onChange={(e) => onFilterChange('price', e.target.value)}
        className="filter-select"
      >
        <option value="">All Prices</option>
        <option value="low">Low Budget</option>
        <option value="medium">Medium</option>
        <option value="high">Premium</option>
      </select>

      <select 
        onChange={(e) => onFilterChange('rating', e.target.value)}
        className="filter-select"
      >
        <option value="">All Ratings</option>
        <option value="4">4+ Stars</option>
        <option value="3">3+ Stars</option>
      </select>
    </div>
  )
}

export default FilterBar
