"use client";

import { useSyncExternalStore } from "react";

const OWNER_TIMEZONE = "Asia/Kolkata";
const OWNER_OFFSET_MINUTES = 330; // UTC+05:30
const SNAPSHOT_SEPARATOR = "||";

const getTimeSnapshot = () => {
  const now = new Date();

  const userTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const ownerTime = now.toLocaleTimeString("en-US", {
    timeZone: OWNER_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const visitorOffsetMinutes = -now.getTimezoneOffset();
  const diffMinutes = visitorOffsetMinutes - OWNER_OFFSET_MINUTES;

  if (diffMinutes === 0) {
    return `${userTime}${SNAPSHOT_SEPARATOR}same time${SNAPSHOT_SEPARATOR}My time: ${ownerTime}`;
  }

  const absDiff = Math.abs(diffMinutes);
  const hours = Math.floor(absDiff / 60);
  const minutes = absDiff % 60;

  const timeParts: string[] = [];
  if (hours > 0) timeParts.push(`${hours}h`);
  if (minutes > 0) timeParts.push(`${minutes}m`);

  const offset = timeParts.join("");
  const relation = diffMinutes > 0 ? `Offset (-${offset})` : `Offset (+${offset})`;

  return `${userTime}${SNAPSHOT_SEPARATOR}${relation}${SNAPSHOT_SEPARATOR}My time: ${ownerTime}`;
};

const subscribe = (onStoreChange: () => void) => {
  const timer = setInterval(onStoreChange, 60_000);
  return () => clearInterval(timer);
};

const getServerSnapshot = () => "";

const LocalTimeChip = () => {
  const snapshot = useSyncExternalStore(subscribe, getTimeSnapshot, getServerSnapshot);

  if (!snapshot) return null;

  const [userTime = "", relation = "", ownerTimeTooltip = ""] = snapshot.split(SNAPSHOT_SEPARATOR);
  const display = relation ? `${userTime} | ${relation}` : userTime;

  return (
    <span className="relative inline-flex group">
      <span
        suppressHydrationWarning
        className="custom-dotted-underline text-xs leading-4 font-normal text-muted-foreground tracking-wide cursor-help"
      >
        {display}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-20 mt-1 w-max rounded-md border border-border bg-background px-2 py-1 text-[11px] leading-4 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {ownerTimeTooltip}
      </span>
    </span>
  );
};

export default LocalTimeChip;
