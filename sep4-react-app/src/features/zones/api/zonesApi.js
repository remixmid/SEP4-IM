import { CROP_TYPES } from "../../../shared/data/cropProfiles.js";
import { createId } from "../../../shared/lib/ids.js";
import { delay } from "../../../shared/lib/delay.js";
import { readStorage, writeStorage } from "../../../shared/lib/storage.js";

const ZONES_KEY = "smart-greenhouse-zones";
const DEFAULT_ZONES = [
  { id: "zone-tomatoes", userId: "user-demo", name: "Tomato House", cropType: "Tomato", createdAt: "2026-08-01T08:00:00.000Z" },
  { id: "zone-herbs", userId: "user-demo", name: "Herb Tunnel", cropType: "Herbs", createdAt: "2026-08-01T08:10:00.000Z" },
  { id: "zone-strawberries", userId: "user-demo", name: "Berry Section", cropType: "Strawberry", createdAt: "2026-08-01T08:20:00.000Z" },
];

function getStore() { return readStorage(ZONES_KEY, DEFAULT_ZONES); }
function setStore(zones) { writeStorage(ZONES_KEY, zones); }

export const zonesApi = {
  async getZones(userId) {
    await delay();
    return getStore().filter((zone) => !userId || zone.userId === userId || zone.userId === "user-demo");
  },

  async getZone(zoneId) {
    await delay(120);
    const zone = getStore().find((item) => item.id === zoneId);
    if (!zone) throw new Error("Greenhouse zone not found");
    return structuredClone(zone);
  },

  async createZone({ userId, name, cropType }) {
    await delay();
    const normalizedName = name.trim();
    if (!normalizedName) throw new Error("Zone name is required");
    if (!CROP_TYPES.includes(cropType)) throw new Error("Unsupported crop type");
    const zones = getStore();
    if (zones.some((zone) => zone.name.toLowerCase() === normalizedName.toLowerCase())) {
      throw new Error("A zone with this name already exists");
    }
    const zone = { id: createId("zone"), userId, name: normalizedName, cropType, createdAt: new Date().toISOString() };
    setStore([...zones, zone]);
    return structuredClone(zone);
  },

  async deleteZone(zoneId) {
    await delay();
    const zones = getStore();
    const zone = zones.find((item) => item.id === zoneId);
    if (!zone) throw new Error("Greenhouse zone not found");
    setStore(zones.filter((item) => item.id !== zoneId));
    return structuredClone(zone);
  },
};
