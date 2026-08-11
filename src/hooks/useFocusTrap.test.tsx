import { fireEvent, render, screen } from "@testing-library/react";
import React, { useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";

function TrapHarness() {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, true);

  return React.createElement(
    "div",
    { ref: containerRef },
    React.createElement("button", { type: "button" }, "First"),
    React.createElement("button", { type: "button" }, "Second")
  );
}

describe("useFocusTrap", () => {
  it("keeps tab navigation inside the container", () => {
    render(React.createElement(TrapHarness));

    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });

    first.focus();
    fireEvent.keyDown(first, { key: "Tab" });
    expect(document.activeElement).toBe(first);
  });
});
