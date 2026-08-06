const META = { temperature: { label: "Temperature", unit: "°C" }, humidity: { label: "Humidity", unit: "%" }, light: { label: "Light", unit: "lx" } };

export function calculateSummary(history, type) {
  const values = history.map((point) => point[type]).filter(Number.isFinite);
  if (!values.length) return null;
  return { min: Math.min(...values), max: Math.max(...values), average: values.reduce((sum, value) => sum + value, 0) / values.length };
}

export default function DailySummary({ history, types }) {
  return (
    <section className="summary-card">
      <span className="eyebrow">Summary</span><h2>Daily statistics</h2>
      {types.map((type) => {
        const summary = calculateSummary(history, type);
        return summary && <div className="summary-row" key={type}><strong>{META[type].label}</strong><span>Min {summary.min} {META[type].unit}</span><span>Avg {summary.average.toFixed(1)} {META[type].unit}</span><span>Max {summary.max} {META[type].unit}</span></div>;
      })}
    </section>
  );
}
