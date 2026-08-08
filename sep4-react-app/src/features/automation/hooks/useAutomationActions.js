import { useEffect, useState } from "react";
import { automationApi } from "../api/automationApi.js";

export function useAutomationActions(zoneId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let active = true;
    setLoading(true);
    automationApi.getActions(zoneId).then((result) => active && setData(result)).catch((err) => active && setError(err)).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [zoneId]);
  return { data, loading, error };
}
