export const CROP_PROFILES = {
  Tomato: {
    description: "Warm conditions with steady moisture and strong light.",
    temperature: { min: 22, max: 26, target: 24, unit: "°C", label: "Temperature" },
    humidity: { min: 60, max: 72, target: 66, unit: "%", label: "Humidity" },
    light: { min: 450, max: 700, target: 560, unit: "lx", label: "Light" },
  },
  Cucumber: {
    description: "Higher humidity and warm air support rapid growth.",
    temperature: { min: 23, max: 28, target: 25, unit: "°C", label: "Temperature" },
    humidity: { min: 70, max: 85, target: 78, unit: "%", label: "Humidity" },
    light: { min: 400, max: 650, target: 520, unit: "lx", label: "Light" },
  },
  Herbs: {
    description: "Moderate temperature, balanced humidity and medium light.",
    temperature: { min: 18, max: 23, target: 21, unit: "°C", label: "Temperature" },
    humidity: { min: 42, max: 60, target: 52, unit: "%", label: "Humidity" },
    light: { min: 300, max: 520, target: 410, unit: "lx", label: "Light" },
  },
  Strawberry: {
    description: "Cooler air with moderate humidity and bright light.",
    temperature: { min: 17, max: 23, target: 20, unit: "°C", label: "Temperature" },
    humidity: { min: 55, max: 70, target: 62, unit: "%", label: "Humidity" },
    light: { min: 420, max: 680, target: 540, unit: "lx", label: "Light" },
  },
};

export const CROP_TYPES = Object.keys(CROP_PROFILES);
