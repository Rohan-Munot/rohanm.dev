import { formatDate } from "@/lib/utils";
import { parse, intervalToDuration } from "date-fns";

export { formatDate };

export const formatDuration = (startDate: string, endDate: string | null): string => {
  const start = parse(startDate, "yyyy-MM", new Date());
  const end = endDate ? parse(endDate, "yyyy-MM", new Date()) : new Date();
  const duration = intervalToDuration({ start, end });

  const parts: string[] = [];
  if (duration.years && duration.years > 0) {
    parts.push(`${duration.years} yr`);
  }
  if (duration.months && duration.months > 0) {
    parts.push(`${duration.months} mo`);
  }

  return parts.join(" ");
};
