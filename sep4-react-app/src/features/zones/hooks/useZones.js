import { useCallback, useEffect, useState } from "react";
import { zonesApi } from "../api/zonesApi.js";

export function useZones(userId) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setZones(await zonesApi.getZones(userId)); }
    catch (err) { setError(err); }
    finally { setLoading(false); }
  }, [userId]);

  useEffect(() => { refresh(); }, [refresh]);

  async function createZone(payload) {
    const zone = await zonesApi.createZone({ ...payload, userId });
    setZones((current) => [...current, zone]);
    return zone;
  }

  async function deleteZone(zoneId) {
    await zonesApi.deleteZone(zoneId);
    setZones((current) => current.filter((zone) => zone.id !== zoneId));
  }

  return { zones, loading, error, createZone, deleteZone };
}
