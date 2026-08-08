import { delay } from "../../../shared/lib/delay.js";
import { CROP_PROFILES } from "../../../shared/data/cropProfiles.js";
import { measurementsApi } from "../../measurements/api/measurementsApi.js";
import { zonesApi } from "../../zones/api/zonesApi.js";
import { DEVICE_TYPES } from "../constants/deviceActions.js";

function event(id, zoneId, point, deviceType, previousState, newState, reason) {
  return { id: `${zoneId}-${id}`, zoneId, deviceType, previousState, newState, reason, timestampUtc: point.timeStamp };
}

function deriveEvents(zone, history) {
  const profile = CROP_PROFILES[zone.cropType];
  const events = [];
  history.forEach((point, index) => {
    if (point.temperature > profile.temperature.max) events.push(event(`${index}-temp-high`, zone.id, point, DEVICE_TYPES.VENT, "Closed", "Open", "Temperature above target range"));
    if (point.temperature < profile.temperature.min) events.push(event(`${index}-temp-low`, zone.id, point, DEVICE_TYPES.HEATER, "Off", "On", "Temperature below target range"));
    if (point.humidity < profile.humidity.min) events.push(event(`${index}-humidity-low`, zone.id, point, DEVICE_TYPES.MISTER, "Off", "On", "Humidity below target range"));
    if (point.humidity > profile.humidity.max) events.push(event(`${index}-humidity-high`, zone.id, point, DEVICE_TYPES.VENT, "Closed", "Open", "Humidity above target range"));
    if (point.light < profile.light.min) events.push(event(`${index}-light-low`, zone.id, point, DEVICE_TYPES.GROW_LIGHT, "Off", "On", "Light below target range"));
    if (point.light > profile.light.max) events.push(event(`${index}-light-high`, zone.id, point, DEVICE_TYPES.SHADE, "Open", "Closed", "Light above target range"));
  });
  if (!events.length && history.length) events.push(event("stable-check", zone.id, history.at(-1), DEVICE_TYPES.IRRIGATION, "Off", "On", "Scheduled irrigation cycle"));
  return events.sort((a, b) => new Date(b.timestampUtc) - new Date(a.timestampUtc)).slice(0, 40);
}

export const automationApi = {
  async getActions(zoneId) {
    await delay(420);
    const [zone, history] = await Promise.all([zonesApi.getZone(zoneId), measurementsApi.getMeasurementsHistory(zoneId)]);
    return deriveEvents(zone, history);
  },
};
