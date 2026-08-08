import { describe, expect, it } from "vitest";
import { automationApi } from "../api/automationApi.js";

describe("automationApi", () => {
  it("derives device actions from mocked sensor history", async () => {
    const actions = await automationApi.getActions("zone-strawberries");
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0]).toEqual(expect.objectContaining({ zoneId: "zone-strawberries", deviceType: expect.any(String), reason: expect.any(String) }));
  });
});
