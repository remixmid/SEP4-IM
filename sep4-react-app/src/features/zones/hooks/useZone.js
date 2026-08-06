import { useEffect, useState } from "react";
import { zonesApi } from "../api/zonesApi.js";

export function useZone(zoneId) {
  const [zone, setZone] = useState(null);
  const [loading, setLoading] = useState(Boolean(zoneId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!zoneId) return;
    let active = true;
    setLoading(true);
    setError(null);
    setZone(null);
    zonesApi.getZone(zoneId)
      .then((result) => active && setZone(result))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [zoneId]);

  return { zone, loading, error };
}
