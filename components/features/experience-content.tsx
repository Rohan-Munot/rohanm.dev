"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExperienceLogo } from "./experience-logo";
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  description: string[];
  startDate: string;
  endDate: string | null;
  logo: string;
  tools?: string[];
  url: string | null;
}

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const ExperienceContent = ({ item }: { item: ExperienceItem }) => (
  <div className="not-last:border-b not-last:border-dashed not-last:border-border py-4 flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <ExperienceLogo item={item} />
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-2">
          {item.url ? (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground custom-dotted-underline"
              aria-label={`Visit ${item.company} website`}
            >
              {item.company}
            </Link>
          ) : (
            <span className="text-sm font-medium text-foreground">
              {item.company}
            </span>
          )}
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {formatDate(item.startDate)} — {item.endDate ? formatDate(item.endDate) : "Present"}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{item.role}</span>
      </div>
    </div>
    <div className="pl-11 flex flex-col gap-2.5">
      {item.description.length > 0 && (
        <ul className="text-sm text-muted-foreground leading-relaxed space-y-1">
          {item.description.map((point, i) => (
            <li
              key={i}
              className="relative pl-4 before:absolute before:left-0 before:top-3 before:h-px before:w-2 before:border-t before:border-dashed before:border-muted-foreground"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
      {item.tools && item.tools.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-foreground">Stack</span>
          <div className="flex flex-wrap gap-1.5">
            {item.tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
