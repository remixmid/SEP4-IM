import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AutomationFilters from "../components/AutomationFilters.jsx";

describe("AutomationFilters", () => {
  it("changes the device filter", () => {
    const setDevice = vi.fn();
    render(<AutomationFilters device="all" setDevice={setDevice} from="" setFrom={vi.fn()} to="" setTo={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Device"), { target: { value: "Heater" } });
    expect(setDevice).toHaveBeenCalledWith("Heater");
  });
});
