import { useEffect, useState } from "react";
import { measurementsApi } from "../api/measurementsApi.js";

export function useCurrentMeasurements(zoneId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!zoneId) { setData(null); return; }
    let active = true;
    setIsLoading(true);
    setError(null);
    measurementsApi.getMeasurements(zoneId)
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [zoneId]);

  return { data, isLoading, error };
}
