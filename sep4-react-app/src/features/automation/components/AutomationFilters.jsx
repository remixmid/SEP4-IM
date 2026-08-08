import { DEVICE_TYPES } from "../constants/deviceActions.js";

export default function AutomationFilters({ device, setDevice, from, setFrom, to, setTo }) {
  return <div className="filters-card"><label>Device<select value={device} onChange={(event) => setDevice(event.target.value)}><option value="all">All devices</option>{Object.values(DEVICE_TYPES).map((type) => <option key={type}>{type}</option>)}</select></label><label>From<input type="datetime-local" value={from} onChange={(event) => setFrom(event.target.value)} /></label><label>To<input type="datetime-local" value={to} onChange={(event) => setTo(event.target.value)} /></label></div>;
}
