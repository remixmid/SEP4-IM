export default function RecommendationCards({ recommendation, pendingType, acceptedTypes, onFeedback }) {
  return (
    <div className="recommendation-grid">
      {recommendation.values.map((value) => {
        const inRange = value.currentValue >= value.minimumValue && value.currentValue <= value.maximumValue;
        return (
          <article className="recommendation-card" key={value.type}>
            <div className="card-top"><div><span className="eyebrow">{value.label}</span><h3>{value.recommendedValue} {value.unit}</h3></div><span className={inRange ? "status good" : "status attention"}>{inRange ? "In range" : "Needs attention"}</span></div>
            <div className="comparison"><span>Current<strong>{value.currentValue} {value.unit}</strong></span><span>Target range<strong>{value.minimumValue} to {value.maximumValue} {value.unit}</strong></span></div>
            <div className="feedback-row">
              <button className="secondary-btn" disabled={pendingType === value.type || acceptedTypes.has(value.type)} onClick={() => onFeedback(value.type, true)}>{acceptedTypes.has(value.type) ? "Accepted" : "Suitable"}</button>
              <button className="secondary-btn" disabled={pendingType === value.type} onClick={() => onFeedback(value.type, false)}>Adjust</button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
