"use client";

import { useEffect, useState } from "react";

const formatIndiaTime = () =>
  new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

const LocalTimeChip = () => {
  const [time, setTime] = useState(formatIndiaTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatIndiaTime());
    }, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span
      suppressHydrationWarning
      className="text-xs leading-4 font-normal text-muted-foreground tracking-tight"
    >
      India &middot; {time}
    </span>
  );
};

export default LocalTimeChip;
