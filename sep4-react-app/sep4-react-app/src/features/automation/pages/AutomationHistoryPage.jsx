import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useZone } from "../../zones/hooks/useZone.js";
import { useAutomationActions } from "../hooks/useAutomationActions.js";
import AutomationFilters from "../components/AutomationFilters.jsx";
import AutomationTable from "../components/AutomationTable.jsx";

export default function AutomationHistoryPage() {
  const { zoneId } = useParams();
  const { zone } = useZone(zoneId);
  const { data, loading, error } = useAutomationActions(zoneId);
  const [device, setDevice] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const filtered = useMemo(() => data.filter((row) => {
    if (device !== "all" && row.deviceType !== device) return false;
    const timestamp = new Date(row.timestampUtc).getTime();
    if (from && timestamp < new Date(from).getTime()) return false;
    if (to && timestamp > new Date(to).getTime()) return false;
    return true;
  }), [data, device, from, to]);
  if (loading) return <div className="center-state">Building automation history...</div>;
  if (error) return <div className="center-state error-text">{error.message}</div>;
  return <div className="page"><header className="page-header"><div><span className="eyebrow">{zone?.cropType}</span><h1>Automation history</h1><p>{zone?.name}. Events are generated from mocked sensor readings and crop target ranges.</p></div></header><AutomationFilters device={device} setDevice={setDevice} from={from} setFrom={setFrom} to={to} setTo={setTo} /><AutomationTable rows={filtered} /></div>;
}
