function DiversityBadge({ diversityLevel }) {
  return (
    <span className={`diversity-badge level-${diversityLevel}`}>
      Diversity: {diversityLevel}
    </span>
  )
}

export default DiversityBadge
