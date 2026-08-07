import { CROP_PROFILES } from "../../../shared/data/cropProfiles.js";
import { createId } from "../../../shared/lib/ids.js";
import { delay } from "../../../shared/lib/delay.js";
import { readStorage, writeStorage } from "../../../shared/lib/storage.js";
import { measurementsApi } from "../../measurements/api/measurementsApi.js";
import { zonesApi } from "../../zones/api/zonesApi.js";

const FEEDBACK_KEY = "smart-greenhouse-feedback";

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

export const recommendationsApi = {
  async getRecommendation(zoneId) {
    await delay(450);
    const [zone, measurements] = await Promise.all([zonesApi.getZone(zoneId), measurementsApi.getMeasurements(zoneId)]);
    const profile = CROP_PROFILES[zone.cropType];
    return {
      id: createId("recommendation"), zoneId, cropType: zone.cropType, createdAt: new Date().toISOString(), predictionHoursAhead: 6,
      values: Object.entries(profile).filter(([type]) => type !== "description").map(([type, target]) => ({
        type, label: target.label, unit: target.unit, currentValue: measurements[type].value,
        recommendedValue: target.target, minimumValue: target.min, maximumValue: target.max,
      })),
    };
  },

  async submitFeedback({ recommendation, valueType, liked }) {
    await delay(300);
    const feedback = readStorage(FEEDBACK_KEY, []);
    writeStorage(FEEDBACK_KEY, [...feedback, { id: createId("feedback"), recommendationId: recommendation.id, zoneId: recommendation.zoneId, valueType, liked, createdAt: new Date().toISOString() }]);
    const current = recommendation.values.find((value) => value.type === valueType);
    if (liked || !current) return { success: true, updatedRecommendation: recommendation };
    const direction = current.currentValue > current.recommendedValue ? 1 : -1;
    const step = valueType === "temperature" ? 0.8 : valueType === "humidity" ? 3 : 25;
    const newValue = clamp(current.recommendedValue + direction * step, current.minimumValue, current.maximumValue);
    return {
      success: true,
      updatedRecommendation: {
        ...recommendation,
        values: recommendation.values.map((value) => value.type === valueType ? { ...value, recommendedValue: Number(newValue.toFixed(1)) } : value),
      },
    };
  },
};
