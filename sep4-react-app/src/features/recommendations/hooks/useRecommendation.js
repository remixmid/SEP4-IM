import { useEffect, useState } from "react";
import { recommendationsApi } from "../api/recommendationsApi.js";

export function useRecommendation(zoneId) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingType, setPendingType] = useState(null);
  const [acceptedTypes, setAcceptedTypes] = useState(new Set());

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setAcceptedTypes(new Set());
    recommendationsApi.getRecommendation(zoneId)
      .then((result) => active && setRecommendation(result))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [zoneId]);

  async function sendFeedback(valueType, liked) {
    if (!recommendation) return;
    setPendingType(valueType);
    try {
      const result = await recommendationsApi.submitFeedback({ recommendation, valueType, liked });
      setRecommendation(result.updatedRecommendation);
      if (liked) setAcceptedTypes((current) => new Set(current).add(valueType));
    } catch (err) { setError(err); }
    finally { setPendingType(null); }
  }

  return { recommendation, loading, error, pendingType, acceptedTypes, sendFeedback };
}
