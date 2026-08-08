import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecommendationCards from "../components/RecommendationCards.jsx";

describe("RecommendationCards", () => {
  it("submits suitable feedback for a metric", () => {
    const onFeedback = vi.fn();
    const recommendation = {
      id: "rec-1",
      values: [{ type: "temperature", label: "Temperature", currentValue: 28, recommendedValue: 24, unit: "°C", minimumValue: 22, maximumValue: 26 }],
    };
    render(<RecommendationCards recommendation={recommendation} pendingType={null} acceptedTypes={new Set()} onFeedback={onFeedback} />);
    fireEvent.click(screen.getByRole("button", { name: /Suitable/i }));
    expect(onFeedback).toHaveBeenCalledWith("temperature", true);
  });
});
