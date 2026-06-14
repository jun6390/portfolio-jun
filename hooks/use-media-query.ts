"use client";

import { useMemo, useSyncExternalStore } from "react";

export const BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

function createMediaQueryStore(query: string) {
  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mediaQueryList = window.matchMedia(query);

    mediaQueryList.addEventListener("change", callback);

    return () => {
      mediaQueryList.removeEventListener("change", callback);
    };
  };

  return {
    getSnapshot,
    subscribe,
  };
}

export function useMediaQuery(query: string) {
  const store = useMemo(() => createMediaQueryStore(query), [query]);

  return useSyncExternalStore(store.subscribe, store.getSnapshot, () => false);
}
