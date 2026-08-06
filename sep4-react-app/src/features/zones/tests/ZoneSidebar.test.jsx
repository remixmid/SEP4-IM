import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ZoneSidebar from "../components/ZoneSidebar.jsx";

describe("ZoneSidebar", () => {
  it("selects a greenhouse zone", () => {
    const onSelect = vi.fn();
    render(<ZoneSidebar zones={[{ id: "z1", name: "Tomato House", cropType: "Tomato" }]} selectedZoneId={null} onSelect={onSelect} onCreate={vi.fn()} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Tomato House/i }));
    expect(onSelect).toHaveBeenCalledWith("z1");
  });
});
