import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/context/authContext.js";
import { CROP_PROFILES } from "../../../shared/data/cropProfiles.js";
import { useZones } from "../hooks/useZones.js";
import ZoneSidebar from "../components/ZoneSidebar.jsx";

export default function DashboardPage() {
  const { user } = useAuth();
  const { zones, loading, error, createZone, deleteZone } = useZones(user.id);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const selectedZone = useMemo(() => zones.find((zone) => zone.id === selectedZoneId), [zones, selectedZoneId]);

  useEffect(() => {
    if (!selectedZoneId && zones.length) setSelectedZoneId(zones[0].id);
    if (selectedZoneId && !zones.some((zone) => zone.id === selectedZoneId)) setSelectedZoneId(zones[0]?.id ?? null);
  }, [zones, selectedZoneId]);

  async function handleCreate(payload) {
    const zone = await createZone(payload);
    setSelectedZoneId(zone.id);
  }

  async function handleDelete() {
    if (!selectedZone) return;
    await deleteZone(selectedZone.id);
  }

  return (
    <div className="dashboard-layout">
      <ZoneSidebar zones={zones} selectedZoneId={selectedZoneId} onSelect={setSelectedZoneId} onCreate={handleCreate} onDelete={handleDelete} />
      <section className="dashboard-content">
        <span className="eyebrow">Greenhouse workspace</span>
        <h1>{selectedZone?.name ?? "Select a greenhouse zone"}</h1>
        {selectedZone && <><p>{CROP_PROFILES[selectedZone.cropType].description}</p><span className="crop-badge">{selectedZone.cropType}</span></>}
        {loading && <p>Loading zones...</p>}
        {error && <p>{error.message}</p>}
      </section>
    </div>
  );
}
