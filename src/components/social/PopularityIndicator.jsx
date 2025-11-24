function PopularityIndicator({ views, likes }) {
  return (
    <div className="popularity-indicator">
      <span className="views">👁️ {views}</span>
      <span className="likes">❤️ {likes}</span>
    </div>
  )
}

export default PopularityIndicator
