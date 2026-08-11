"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", { hour12: false });
}

export function ArchClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span id="arch-clock" className="arch-module" aria-hidden="true" suppressHydrationWarning>
      {time || "00:00:00"}
    </span>
  );
}
