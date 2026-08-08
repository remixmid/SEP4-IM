import { describe, expect, it } from "vitest";
import { loginUser, registerUser } from "../api/mockAuthApi.js";
import { decodeToken } from "../utils/token.js";

describe("mockAuthApi", () => {
  it("logs in with the demo account and returns a decodable token", async () => {
    const result = await loginUser({ email: "demo@greenhouse.local", password: "demo123" });
    expect(result.user.name).toBe("Demo Grower");
    expect(decodeToken(result.token).email).toBe("demo@greenhouse.local");
  });

  it("registers and then logs in a new grower", async () => {
    await registerUser({ name: "Alex", email: "alex@example.com", password: "secret1" });
    const result = await loginUser({ email: "alex@example.com", password: "secret1" });
    expect(result.user.name).toBe("Alex");
  });
});
