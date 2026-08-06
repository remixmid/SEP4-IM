import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const META = {
  temperature: { label: "Temperature", unit: "°C", color: "#df5f3f" },
  humidity: { label: "Humidity", unit: "%", color: "#3d7ee8" },
  light: { label: "Light", unit: "lx", color: "#d69f2d" },
};

function formatTime(value) { return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

export default function MeasurementChart({ activeType, data }) {
  const types = activeType === "all" ? Object.keys(META) : [activeType];
  return (
    <section className="chart-card">
      <div className="section-heading"><div><span className="eyebrow">Last 24 hours</span><h2>Environmental trend</h2></div></div>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timeStamp" tickFormatter={formatTime} minTickGap={35} />
          <YAxis />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} formatter={(value, name) => [`${value} ${META[name].unit}`, META[name].label]} />
          <Legend formatter={(name) => META[name].label} />
          {types.map((type) => <Line key={type} type="monotone" dataKey={type} stroke={META[type].color} strokeWidth={3} dot={false} isAnimationActive={false} />)}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
