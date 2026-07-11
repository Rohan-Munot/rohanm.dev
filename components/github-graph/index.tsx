"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import SnakeGame from "@/components/snake-game";
import { CursorClickIcon } from "@phosphor-icons/react/ssr";
import { SpinnerIcon } from "@phosphor-icons/react";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionsData {
  total: number;
  contributions: ContributionDay[];
}

interface TooltipData {
  count: number;
  date: string;
  x: number;
  y: number;
}

const getContributionLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

const formatDay = (dateString: string): string => {
  return format(
    parse(dateString, "yyyy-MM-dd", new Date()),
    "EEE, MMM d, yyyy",
  );
};

const GitHubGraph = () => {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github/contributions");
        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    day: ContributionDay,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget
      .closest(".github-graph")
      ?.getBoundingClientRect();

    if (parentRect) {
      setTooltip({
        count: day.count,
        date: day.date,
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 8,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  useLayoutEffect(() => {
    if (!tooltip) return;

    const measure = () => {
      if (!tooltipRef.current || !containerRef.current) return;
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setTooltipWidth(tooltipRect.width);
      setContainerWidth(containerRect.width);
    };

    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [tooltip]);

  if (loading) {
    return (
      <div className="w-full h-38 flex justify-center items-center p-4">
        <SpinnerIcon className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-muted-foreground text-sm">
        Unable to load contributions
      </div>
    );
  }

  if (!data) return null;

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < data.contributions.length; i += 7) {
    weeks.push(data.contributions.slice(i, i + 7));
  }

  const getMonthLabels = (): { month: string; weekIndex: number }[] => {
    const months: { month: string; weekIndex: number }[] = [];
    let lastMonth = "";

    weeks.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const date = parse(week[0].date, "yyyy-MM-dd", new Date());
        const month = format(date, "MMM");
        if (month !== lastMonth) {
          months.push({ month, weekIndex });
          lastMonth = month;
        }
      }
    });

    return months;
  };

  const monthLabels = getMonthLabels();

  const cols = weeks.length;
  const rows = 7;

  const clampedTooltipX = (() => {
    if (!tooltip) return 0;
    if (!tooltipWidth || !containerWidth) return tooltip.x;
    const padding = 8;
    const half = tooltipWidth / 2;
    return Math.min(
      Math.max(tooltip.x, padding + half),
      containerWidth - padding - half,
    );
  })();

  return (
    <div ref={containerRef} className="github-graph relative w-full">
      {showGame ? (
        <div className="min-h-37.5">
          <SnakeGame
            rows={rows}
            cols={cols}
            onClose={() => setShowGame(false)}
          />
        </div>
      ) : (
        <div
          onClick={isMobile ? undefined : () => setShowGame(true)}
          className={cn(
            "group relative min-h-37",
            !isMobile && "cursor-pointer",
          )}
          role={isMobile ? undefined : "button"}
          tabIndex={isMobile ? undefined : 0}
          onKeyDown={
            isMobile
              ? undefined
              : (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowGame(true);
                  }
                }
          }
        >
          <div className="overflow-x-auto py-1 no-scrollbar">
            <div className="min-w-[700px]">
              <div className="grid grid-flow-col auto-cols-fr gap-[3px] w-full mb-1">
                {weeks.map((_, weekIndex) => {
                  const monthLabel = monthLabels.find(
                    (m) => m.weekIndex === weekIndex,
                  );
                  return (
                    <div
                      key={weekIndex}
                      className="text-xs text-muted-foreground"
                    >
                      {monthLabel ? monthLabel.month : ""}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-flow-col auto-cols-fr gap-px w-full">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-px">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        className={cn(
                          "aspect-square cursor-pointer transition-all duration-150 hover:scale-105",
                          getContributionClass(getContributionLevel(day.count)),
                        )}
                        onMouseEnter={(e) => handleMouseEnter(e, day)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {tooltip && (
            <div
              ref={tooltipRef}
              className={cn(
                "absolute z-10 px-2 py-1 text-xs bg-popover text-popover-foreground border border-border shadow-lg pointer-events-none whitespace-nowrap rounded-sm",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-sm)-1px)]",
                "before:shadow-[0_-1px_0_0_rgba(0,0,0,0.2)] dark:before:shadow-[0_-1px_0px_0_rgba(255,255,255,0.2)]",
              )}
              style={{
                left: clampedTooltipX,
                top: tooltip.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <span className="font-medium">
                {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-muted-foreground sm:tracking-normal tracking-tighter">
              {data.total} contributions last year
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Less</span>
              <div className="flex gap-[3px]">
                {[0, 1, 2, 4].map((level) => (
                  <div
                    key={level}
                    className={`size-2.5 rounded-[2px] ${getContributionClass(level)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6.5 backdrop-blur-3xl border border-border p-0.5 px-1 bg-muted rounded-sm flex opacity-0 group-hover:opacity-100 items-center justify-center pointer-events-none transition-opacity duration-200 gap-1.5 z-20">
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                click
              </span>
              <CursorClickIcon className="size-3.5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CONTRIBUTION_CLASSES: Record<number, string> = {
  0: "bg-[var(--github-0)]",
  1: "bg-[var(--github-1)]",
  2: "bg-[var(--github-2)]",
  3: "bg-[var(--github-3)]",
  4: "bg-[var(--github-4)]",
};

const getContributionClass = (level: number): string => {
  return CONTRIBUTION_CLASSES[level] ?? CONTRIBUTION_CLASSES[0];
};

export default GitHubGraph;
