"use client";

import { useSyncExternalStore } from "react";

const OWNER_TIMEZONE = "Asia/Kolkata";
const OWNER_OFFSET_MINUTES = 330; // UTC+05:30

const getTimeSnapshot = () => {
  const now = new Date();

  const ownerTime = now.toLocaleTimeString("en-US", {
    timeZone: OWNER_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const userOffset = now.getTimezoneOffset();
  const diffMinutes = OWNER_OFFSET_MINUTES + userOffset;

  let diff: string;
  if (diffMinutes > 0) {
    const h = Math.floor(diffMinutes / 60);
    const m = diffMinutes % 60;
    diff = `${h}h${m > 0 ? ` ${m}m` : ""} ahead`;
  } else if (diffMinutes < 0) {
    const abs = Math.abs(diffMinutes);
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    diff = `${h}h${m > 0 ? ` ${m}m` : ""} behind`;
  } else {
    diff = "same time";
  }

  return `${ownerTime}||${diff}`;
};

const subscribe = (onStoreChange: () => void) => {
  const timer = setInterval(onStoreChange, 60_000);
  return () => clearInterval(timer);
};

const getServerSnapshot = () => "";

const LocalTimeChip = () => {
  const snapshot = useSyncExternalStore(subscribe, getTimeSnapshot, getServerSnapshot);

  if (!snapshot) return null;

  const [time = "", diff = ""] = snapshot.split("||");

  return (
    <p
      className="text-balance text-xs font-normal text-muted-foreground/80 tracking-tight"
      aria-label={`Local time: ${time}`}
    >
      <span className="text-foreground">{time}</span>
      <span aria-hidden="true">{` // ${diff}`}</span>
    </p>
  );
};

export default LocalTimeChip;
