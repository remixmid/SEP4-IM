import { describe, expect, it } from "vitest";
import { zonesApi } from "../api/zonesApi.js";

describe("zonesApi", () => {
  it("creates and deletes a greenhouse zone", async () => {
    const created = await zonesApi.createZone({ userId: "user-demo", name: "Test Zone", cropType: "Cucumber" });
    expect(created.cropType).toBe("Cucumber");
    expect((await zonesApi.getZones("user-demo")).some((zone) => zone.id === created.id)).toBe(true);
    await zonesApi.deleteZone(created.id);
    expect((await zonesApi.getZones("user-demo")).some((zone) => zone.id === created.id)).toBe(false);
  });

  it("rejects duplicate names", async () => {
    await expect(zonesApi.createZone({ userId: "user-demo", name: "Tomato House", cropType: "Tomato" })).rejects.toThrow("already exists");
  });
});
