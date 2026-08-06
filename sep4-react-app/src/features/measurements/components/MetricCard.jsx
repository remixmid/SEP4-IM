const META = {
  temperature: { label: "Temperature", unit: "°C", icon: "TEMP" },
  humidity: { label: "Humidity", unit: "%", icon: "HUM" },
  light: { label: "Light", unit: "lx", icon: "LUX" },
};

export default function MetricCard({ type, value, timestamp }) {
  const meta = META[type];
  return (
    <article className="metric-card">
      <div className={`metric-icon ${type}`}>{meta.icon}</div>
      <div><span>{meta.label}</span><strong>{value} <small>{meta.unit}</small></strong><time>{new Date(timestamp).toLocaleString()}</time></div>
    </article>
  );
}
