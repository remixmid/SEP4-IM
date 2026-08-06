import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useZone } from "../../zones/hooks/useZone.js";
import { measurementsApi } from "../api/measurementsApi.js";
import MetricCard from "../components/MetricCard.jsx";
import MeasurementChart from "../components/MeasurementChart.jsx";
import DailySummary from "../components/DailySummary.jsx";

const TYPES = ["temperature", "humidity", "light"];

export default function ViewDataPage() {
  const { zoneId } = useParams();
  const { zone } = useZone(zoneId);
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeType, setActiveType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([measurementsApi.getMeasurements(zoneId), measurementsApi.getMeasurementsHistory(zoneId)])
      .then(([currentData, historyData]) => { if (active) { setCurrent(currentData); setHistory(historyData); } })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [zoneId]);

  if (loading) return <div className="center-state">Loading environmental data...</div>;
  if (error) return <div className="center-state error-text">{error.message}</div>;
  const visibleTypes = activeType === "all" ? TYPES : [activeType];

  return (
    <div className="page">
      <header className="page-header"><div><span className="eyebrow">{zone?.cropType}</span><h1>Environmental data</h1><p>{zone?.name}</p></div></header>
      <div className="filter-tabs"><button className={activeType === "all" ? "active" : ""} onClick={() => setActiveType("all")}>All</button>{TYPES.map((type) => <button className={activeType === type ? "active" : ""} key={type} onClick={() => setActiveType(type)}>{type}</button>)}</div>
      <div className="metric-grid">{visibleTypes.map((type) => <MetricCard key={type} type={type} value={current[type].value} timestamp={current[type].timeStamp} />)}</div>
      <div className="data-layout"><MeasurementChart activeType={activeType} data={history} /><DailySummary history={history} types={visibleTypes} /></div>
    </div>
  );
}
