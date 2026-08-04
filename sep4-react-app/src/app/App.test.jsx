import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("App foundation", () => {
  it("renders the Smart Greenhouse heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Smart Greenhouse" })).toBeInTheDocument();
  });
});
