"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Force top scroll immediately on initial load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 3. Clear any lingering anchor hash on reload so the browser never auto-scrolls down
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    // 4. Force top scroll on route transitions
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
