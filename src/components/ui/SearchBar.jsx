import { useState } from 'react'
import { Button } from '@mui/material'

function SearchBar({ onSearch, placeholder = "Search destinations..." }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar" style={{ display: 'flex', alignItems: 'stretch', marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        style={{ 
          padding: '10px 16px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px 0 0 4px',
          outline: 'none',
          flex: 1,
          marginRight: '5px'
        }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        sx={{ 
          borderRadius: '0 4px 4px 0',
          minWidth: '100px',
          fontSize: '16px',
          marginLeft: '5px'
        }}
      >
        Search
      </Button>
    </form>
  )
}

export default SearchBar
