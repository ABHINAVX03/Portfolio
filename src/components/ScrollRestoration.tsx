"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Next.js natively handles some scroll restoration, but setting this to manual
    // prevents the browser from preserving the scroll position on reload.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // 2. Force scroll to top on every route change (including initial load)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
