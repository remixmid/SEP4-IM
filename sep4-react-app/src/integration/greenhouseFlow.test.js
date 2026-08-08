import { describe, expect, it } from "vitest";
import { zonesApi } from "../features/zones/api/zonesApi.js";
import { measurementsApi } from "../features/measurements/api/measurementsApi.js";
import { recommendationsApi } from "../features/recommendations/api/recommendationsApi.js";
import { automationApi } from "../features/automation/api/automationApi.js";

describe("greenhouse feature flow", () => {
  it("connects zone data, mock IoT, recommendations and automation", async () => {
    const zone = await zonesApi.getZone("zone-tomatoes");
    const readings = await measurementsApi.getMeasurements(zone.id);
    const recommendation = await recommendationsApi.getRecommendation(zone.id);
    const actions = await automationApi.getActions(zone.id);

    expect(zone.cropType).toBe("Tomato");
    expect(readings.temperature.value).toEqual(expect.any(Number));
    expect(recommendation.values).toHaveLength(3);
    expect(actions.length).toBeGreaterThan(0);
  });
});
