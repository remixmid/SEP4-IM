import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("Authentication routes", () => {
  it("shows the login page to an anonymous user", async () => {
    window.location.hash = "#/login";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
  });
});
