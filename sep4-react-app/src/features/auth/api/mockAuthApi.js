import { createId } from "../../../shared/lib/ids.js";
import { delay } from "../../../shared/lib/delay.js";
import { readStorage, writeStorage } from "../../../shared/lib/storage.js";
import { createMockToken } from "../utils/token.js";

const USERS_KEY = "smart-greenhouse-users";
const DEFAULT_USERS = [
  { id: "user-demo", name: "Demo Grower", email: "demo@greenhouse.local", password: "demo123" },
];

export async function registerUser({ name, email, password }) {
  await delay(350);
  const users = readStorage(USERS_KEY, DEFAULT_USERS);
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists");
  }

  const user = {
    id: createId("user"),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };
  writeStorage(USERS_KEY, [...users, user]);
  return { success: true, message: "Registration successful. You can now log in." };
}

export async function loginUser({ email, password }) {
  await delay(350);
  const users = readStorage(USERS_KEY, DEFAULT_USERS);
  const normalizedEmail = email.trim().toLowerCase();
  const match = users.find((user) => user.email === normalizedEmail && user.password === password);

  if (!match) throw new Error("Invalid email or password");

  const user = { id: match.id, name: match.name, email: match.email };
  return { success: true, token: createMockToken(user), user };
}
