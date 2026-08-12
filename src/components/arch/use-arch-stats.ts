"use client";

import { useEffect, useState } from "react";
import { loadArchVisitors, readMemoryUsage, type MemoryReading } from "@/lib/arch";

const MEMORY_POLL_MS = 3000;

/**
 * Memory + visitor stats for the waybar, kept out of ArchProvider's shared
 * context — it's the only thing that displays these, so polling lives here
 * instead of re-rendering every context consumer on every tick.
 */
export function useArchStats() {
  const [memory, setMemory] = useState<MemoryReading>({ supported: false });
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    let id: number | null = null;

    const start = () => {
      setMemory(readMemoryUsage());
      id = window.setInterval(() => setMemory(readMemoryUsage()), MEMORY_POLL_MS);
    };
    const stop = () => {
      if (id !== null) {
        window.clearInterval(id);
        id = null;
      }
    };

    // Don't bother polling while the tab isn't visible — nothing's reading it.
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadArchVisitors().then((count) => {
      if (!cancelled) setVisitors(count);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { memory, visitors };
}
