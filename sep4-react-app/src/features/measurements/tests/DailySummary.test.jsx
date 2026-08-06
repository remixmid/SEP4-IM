import { describe, expect, it } from "vitest";
import { calculateSummary } from "../components/DailySummary.jsx";

describe("calculateSummary", () => {
  it("calculates minimum, maximum and average", () => {
    const summary = calculateSummary([{ temperature: 20 }, { temperature: 22 }, { temperature: 24 }], "temperature");
    expect(summary).toEqual({ min: 20, max: 24, average: 22 });
  });
});
