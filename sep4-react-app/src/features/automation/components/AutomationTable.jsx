export default function AutomationTable({ rows }) {
  if (!rows.length) return <div className="empty-card">No automation events match the selected filters.</div>;
  return <div className="table-card"><div className="table-row table-header"><span>Time</span><span>Device</span><span>State change</span><span>Reason</span></div>{rows.map((row) => <div className="table-row" key={row.id}><time>{new Date(row.timestampUtc).toLocaleString()}</time><strong>{row.deviceType}</strong><span><span className="chip">{row.previousState}</span> <b>to</b> <span className="chip active">{row.newState}</span></span><span>{row.reason}</span></div>)}</div>;
}
