"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export function LocalTimeBadge() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="local-time-badge">
      <span className="pulse-dot" aria-hidden="true" />
      <b>Open for projects</b>
      <span aria-hidden="true">·</span>
      {time ? <span>{time} IST in India — usually replying within a day.</span> : <span>India time — usually replying within a day.</span>}
    </p>
  );
}
