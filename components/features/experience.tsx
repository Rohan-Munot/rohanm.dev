"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowBendDoubleUpRightIcon } from "@phosphor-icons/react/dist/ssr";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  description: string[];
  startDate: string;
  endDate: string | null;
  tools?: string[];
  url: string | null;
}

interface ExperienceProps {
  data: ExperienceItem[];
  className?: string;
  showAll?: boolean;
}

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const Experience = ({ data, className, showAll = false }: ExperienceProps) => {
  return (
    <div className={cn("group relative flex flex-col",
      !showAll && "max-h-[450px] overflow-hidden",
      className)}>
      {data.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "relative pl-6 pb-8",
            index === data.length - 1 && "pb-0",
          )}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 size-3 rounded-full border-2 border-border bg-background" />

          {!item.endDate && (
            <div className="absolute left-1 top-2.5 size-1 rounded-full bg-foreground animate-ping ease-in-out" />
          )}

          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-medium text-foreground">
                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 custom-dotted-underline"
                      aria-label={`Visit ${item.company}`}
                    >
                      {item.company}
                    </Link>
                  ) : (
                    item.company
                  )}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {formatDate(item.startDate)} —{" "}
                  {item.endDate ? formatDate(item.endDate) : "Present"}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{item.role}</span>
            </div>

            {/* Description */}
            {item.description && item.description.length > 0 && (
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

            {/* Tools */}
            {item.tools && <span className="text-sm text-foreground">Technologies & Tools</span>}
            {item.tools && (
              <div className="flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {!showAll && (
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background via-background/90 to-transparent z-10 flex items-end justify-center pb-2 pointer-events-none">
          <Link
            href="/work"
            className="backdrop-blur-3xl border border-border p-1.5 px-2 bg-muted rounded-sm flex items-center justify-center  duration-200 gap-1.5 pointer-events-auto"
          >
            <span className="text-xs text-foreground font-medium tracking-wide">
              All
            </span>
            <ArrowBendDoubleUpRightIcon  className="size-3.5 text-foreground" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Experience;
