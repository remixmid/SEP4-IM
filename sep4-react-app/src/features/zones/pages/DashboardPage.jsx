import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/authContext.js";
import { CROP_PROFILES } from "../../../shared/data/cropProfiles.js";
import { useCurrentMeasurements } from "../../measurements/hooks/useCurrentMeasurements.js";
import MetricCard from "../../measurements/components/MetricCard.jsx";
import { useZones } from "../hooks/useZones.js";
import ZoneSidebar from "../components/ZoneSidebar.jsx";

export default function DashboardPage() {
  const { user } = useAuth();
  const { zones, loading: zonesLoading, error: zonesError, createZone, deleteZone } = useZones(user.id);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const selectedZone = useMemo(() => zones.find((zone) => zone.id === selectedZoneId), [zones, selectedZoneId]);
  const { data, isLoading, error } = useCurrentMeasurements(selectedZoneId);

  useEffect(() => {
    if (!selectedZoneId && zones.length) setSelectedZoneId(zones[0].id);
    if (selectedZoneId && !zones.some((zone) => zone.id === selectedZoneId)) setSelectedZoneId(zones[0]?.id ?? null);
  }, [zones, selectedZoneId]);

  async function handleCreate(payload) { const zone = await createZone(payload); setSelectedZoneId(zone.id); }
  async function handleDelete() {
    if (!selectedZone || !confirm(`Delete ${selectedZone.name}?`)) return;
    await deleteZone(selectedZone.id);
  }

  return (
    <div className="dashboard-layout">
      <ZoneSidebar zones={zones} selectedZoneId={selectedZoneId} onSelect={setSelectedZoneId} onCreate={handleCreate} onDelete={handleDelete} />
      <section className="dashboard-content">
        <header className="dashboard-hero"><div><span className="eyebrow">Smart Greenhouse Control</span><h1>{selectedZone ? selectedZone.name : "Select a greenhouse zone"}</h1><p>{selectedZone ? CROP_PROFILES[selectedZone.cropType].description : "Create a zone to start monitoring mocked environmental data."}</p></div>{selectedZone && <span className="crop-badge">{selectedZone.cropType}</span>}</header>
        {zonesLoading && <div className="center-state">Loading zones...</div>}
        {zonesError && <div className="error-text">{zonesError.message}</div>}
        {selectedZone && <>
          <div className="action-grid"><Link to={`/recommendations/${selectedZone.id}`}><span>Crop targets</span><strong>Growth recommendation</strong><small>Rule-based mock ML</small></Link><Link to={`/view-data/${selectedZone.id}`}><span>Telemetry</span><strong>View environmental data</strong><small>Current and 24-hour history</small></Link><Link to={`/automation-history/${selectedZone.id}`}><span>Control log</span><strong>Automation history</strong><small>Simulated device decisions</small></Link></div>
          <div className="section-heading"><div><span className="eyebrow">Mock IoT feed</span><h2>Current conditions</h2></div><span className="live-pill">Simulated live</span></div>
          {isLoading && <div className="center-state">Reading sensors...</div>}
          {error && <div className="error-text">{error.message}</div>}
          {data && <div className="metric-grid">{["temperature", "humidity", "light"].map((type) => <MetricCard key={type} type={type} value={data[type].value} timestamp={data[type].timeStamp} />)}</div>}
          <section className="scope-card"><div><span className="eyebrow">Project scope</span><h2>Frontend-first simulation</h2></div><p>IoT readings, machine learning recommendations and device actions are implemented as asynchronous mock services. The interfaces are separated from the UI so real APIs can replace the mocks later.</p></section>
        </>}
      </section>
    </div>
  );
}
