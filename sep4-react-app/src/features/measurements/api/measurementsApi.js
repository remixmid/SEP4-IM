import { delay } from "../../../shared/lib/delay.js";
import { zonesApi } from "../../zones/api/zonesApi.js";
import { CROP_PROFILES } from "../../../shared/data/cropProfiles.js";

function seedFromString(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function wave(seed, hour, amplitude, phase = 0) {
  return Math.sin((hour + phase + seed % 12) / 3.2) * amplitude;
}

function buildPoint(zone, date) {
  const profile = CROP_PROFILES[zone.cropType];
  const seed = seedFromString(zone.id);
  const hour = date.getHours() + date.getMinutes() / 60;
  const temperature = profile.temperature.target + wave(seed, hour, 3.2) + ((seed % 5) - 2) * 0.35;
  const humidity = profile.humidity.target + wave(seed, hour, 10, 4) + ((seed % 7) - 3) * 0.7;
  const daylight = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
  const light = profile.light.min * 0.35 + daylight * profile.light.target + wave(seed, hour, 45, 1);
  return {
    timeStamp: date.toISOString(),
    temperature: Number(temperature.toFixed(1)),
    humidity: Number(Math.max(15, Math.min(98, humidity)).toFixed(1)),
    light: Math.max(0, Math.round(light)),
  };
}

export const measurementsApi = {
  async getMeasurements(zoneId) {
    await delay(300);
    const zone = await zonesApi.getZone(zoneId);
    const point = buildPoint(zone, new Date());
    return {
      zoneId,
      temperature: { value: point.temperature, timeStamp: point.timeStamp },
      humidity: { value: point.humidity, timeStamp: point.timeStamp },
      light: { value: point.light, timeStamp: point.timeStamp },
    };
  },

  async getMeasurementsHistory(zoneId) {
    await delay(450);
    const zone = await zonesApi.getZone(zoneId);
    return Array.from({ length: 25 }, (_, index) => {
      const hoursAgo = 24 - index;
      return buildPoint(zone, new Date(Date.now() - hoursAgo * 60 * 60 * 1000));
    });
  },
};
