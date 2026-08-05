export function delay(milliseconds = 250) {
  if (import.meta.env?.MODE === "test") return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
