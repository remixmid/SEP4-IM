import { describe, expect, it } from "vitest";
import { measurementsApi } from "../api/measurementsApi.js";

describe("measurementsApi", () => {
  it("returns current values for all three sensors", async () => {
    const result = await measurementsApi.getMeasurements("zone-tomatoes");
    expect(result.temperature.value).toEqual(expect.any(Number));
    expect(result.humidity.value).toEqual(expect.any(Number));
    expect(result.light.value).toEqual(expect.any(Number));
  });

  it("generates 25 hourly history points", async () => {
    const history = await measurementsApi.getMeasurementsHistory("zone-herbs");
    expect(history).toHaveLength(25);
    expect(history[0]).toHaveProperty("timeStamp");
  });
});
