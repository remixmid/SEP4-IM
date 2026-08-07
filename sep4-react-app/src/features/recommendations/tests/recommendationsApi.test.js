import { describe, expect, it } from "vitest";
import { recommendationsApi } from "../api/recommendationsApi.js";

describe("recommendationsApi", () => {
  it("uses the crop profile to create three recommendations", async () => {
    const result = await recommendationsApi.getRecommendation("zone-tomatoes");
    expect(result.cropType).toBe("Tomato");
    expect(result.values).toHaveLength(3);
    expect(result.values.every((value) => value.recommendedValue >= value.minimumValue && value.recommendedValue <= value.maximumValue)).toBe(true);
  });

  it("stores feedback and keeps adjusted value inside the target range", async () => {
    const recommendation = await recommendationsApi.getRecommendation("zone-herbs");
    const result = await recommendationsApi.submitFeedback({ recommendation, valueType: "temperature", liked: false });
    const value = result.updatedRecommendation.values.find((item) => item.type === "temperature");
    expect(value.recommendedValue).toBeGreaterThanOrEqual(value.minimumValue);
    expect(value.recommendedValue).toBeLessThanOrEqual(value.maximumValue);
  });
});
