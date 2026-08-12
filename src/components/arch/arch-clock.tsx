"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", { hour12: false });
}

export function ArchClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    let id: number | null = null;

    const tick = () => setTime(formatTime(new Date()));
    const start = () => {
      tick();
      id = window.setInterval(tick, 1000);
    };
    const stop = () => {
      if (id !== null) {
        window.clearInterval(id);
        id = null;
      }
    };

    // No point ticking a clock nobody's looking at.
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <span id="arch-clock" className="arch-module" aria-hidden="true" suppressHydrationWarning>
      {time || "00:00:00"}
    </span>
  );
}
