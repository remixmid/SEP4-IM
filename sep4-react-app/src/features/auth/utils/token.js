function encodePart(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function decodePart(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function decodeToken(token) {
  try {
    const [, payload] = token.split(".");
    return payload ? decodePart(payload) : null;
  } catch {
    return null;
  }
}

export function createMockToken(user, lifetimeSeconds = 8 * 60 * 60) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodePart({ alg: "none", typ: "JWT" });
  const payload = encodePart({
    sub: user.id,
    name: user.name,
    email: user.email,
    iat: now,
    exp: now + lifetimeSeconds,
  });
  return `${header}.${payload}.mock-signature`;
}
