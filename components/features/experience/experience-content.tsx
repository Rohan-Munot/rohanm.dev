import Link from "next/link";
import { ExperienceLogo } from "./experience-logo";
import { ExperienceBullets } from "./experience-bullets";

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
      <ExperienceBullets
        items={item.description}
        tools={item.tools}
      />
    </div>
  </div>
);
