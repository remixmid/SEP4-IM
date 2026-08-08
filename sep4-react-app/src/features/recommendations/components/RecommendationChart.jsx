import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function RecommendationChart({ recommendation }) {
  return (
    <section className="chart-card recommendation-chart"><span className="eyebrow">Rule-based mock ML</span><h2>Current value against target</h2>
      <div className="mini-chart-grid">{recommendation.values.map((value) => {
        const data = [{ name: "Current", value: value.currentValue }, { name: "Recommended", value: value.recommendedValue }];
        const values = [value.currentValue, value.recommendedValue, value.minimumValue, value.maximumValue];
        const min = Math.max(0, Math.min(...values) * 0.75);
        const max = Math.max(...values) * 1.2;
        return <div className="mini-chart" key={value.type}><h3>{value.label}</h3><ResponsiveContainer width="100%" height={250}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" /><YAxis domain={[min, max]} /><Tooltip formatter={(number) => `${number} ${value.unit}`} /><ReferenceLine y={value.minimumValue} stroke="#45a36b" strokeDasharray="4 4" /><ReferenceLine y={value.maximumValue} stroke="#d0873c" strokeDasharray="4 4" /><Bar dataKey="value">{data.map((entry) => <Cell key={entry.name} fill={entry.name === "Recommended" ? "#2f7d55" : "#91b99f"} />)}</Bar></BarChart></ResponsiveContainer></div>;
      })}</div>
    </section>
  );
}
