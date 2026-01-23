"use client";

import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  tools: string[];
  url: string | null;
}

interface ExperienceProps {
  data: ExperienceItem[];
  className?: string;
}

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const Experience = ({ data, className }: ExperienceProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {data.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "relative pl-6 pb-8",
            index === data.length - 1 && "pb-0",
          )}
        >
          {/* Timeline line */}
          {index !== data.length - 1 && (
            <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border" />
          )}

          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-border bg-background" />

          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-medium text-foreground">{item.role}</h3>
                <span className="text-xs text-muted-foreground">
                  {formatDate(item.startDate)} —{" "}
                  {item.endDate ? formatDate(item.endDate) : "Present"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span>{item.company}</span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                    aria-label={`Visit ${item.company}`}
                  >
                    <ArrowSquareOutIcon className="size-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {item.tools.map((tool) => (
                <Badge key={tool}>{tool}</Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
