// src/components/ScrollToHash.tsx
"use client";

import { useEffect } from "react";

/**
 * Scrolls to any hash in the URL after the React app has hydrated.
 * Works for login/logout redirects, deep links, and section anchors.
 */
export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Delay slightly to ensure DOM is fully rendered
    const timeout = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
