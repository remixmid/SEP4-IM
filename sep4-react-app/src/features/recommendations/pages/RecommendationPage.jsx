import { useParams } from "react-router-dom";
import { useZone } from "../../zones/hooks/useZone.js";
import { useRecommendation } from "../hooks/useRecommendation.js";
import RecommendationCards from "../components/RecommendationCards.jsx";
import RecommendationChart from "../components/RecommendationChart.jsx";

export default function RecommendationPage() {
  const { zoneId } = useParams();
  const { zone } = useZone(zoneId);
  const { recommendation, loading, error, pendingType, acceptedTypes, sendFeedback } = useRecommendation(zoneId);
  if (loading) return <div className="center-state">Calculating crop recommendation...</div>;
  if (error) return <div className="center-state error-text">{error.message}</div>;
  return <div className="page"><header className="page-header"><div><span className="eyebrow">{zone?.cropType}</span><h1>Growth recommendation</h1><p>{zone?.name}. Prediction horizon: {recommendation.predictionHoursAhead} hours.</p></div></header><RecommendationCards recommendation={recommendation} pendingType={pendingType} acceptedTypes={acceptedTypes} onFeedback={sendFeedback} /><RecommendationChart recommendation={recommendation} /></div>;
}
