"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onPointerEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(target?.closest("a, button, input, textarea, select, [role='button']"));
      setIsPointer(interactive);
    };

    const onPointerLeave = () => setIsPointer(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onPointerEnter);
    window.addEventListener("mouseout", onPointerLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onPointerEnter);
      window.removeEventListener("mouseout", onPointerLeave);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`custom-cursor ${isPointer ? "is-pointer" : ""}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div
        aria-hidden="true"
        className={`custom-cursor-trail ${isPointer ? "is-pointer" : ""}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </>
  );
}
