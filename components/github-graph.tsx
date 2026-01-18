"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import SnakeGame from "./snake-game";
import { CursorClickIcon } from "@phosphor-icons/react/ssr";

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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const GitHubGraph = () => {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile/touch device
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

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="animate-pulse flex flex-col gap-2">
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-24 bg-muted rounded" />
        </div>
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

  // Group contributions into weeks (7 days each)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < data.contributions.length; i += 7) {
    weeks.push(data.contributions.slice(i, i + 7));
  }

  // Get month labels with their starting week index
  const getMonthLabels = (): { month: string; weekIndex: number }[] => {
    const months: { month: string; weekIndex: number }[] = [];
    let lastMonth = "";

    weeks.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const date = new Date(week[0].date);
        const month = date.toLocaleDateString("en-US", { month: "short" });
        if (month !== lastMonth) {
          months.push({ month, weekIndex });
          lastMonth = month;
        }
      }
    });

    return months;
  };

  const monthLabels = getMonthLabels();

  // Calculate grid dimensions for snake game (matches contribution grid)
  const cols = weeks.length;
  const rows = 7;

  return (
    <div className="github-graph relative w-full">
      <AnimatePresence mode="wait">
        {showGame ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
          >
            <SnakeGame
              rows={rows}
              cols={cols}
              onClose={() => setShowGame(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="graph"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            onClick={isMobile ? undefined : () => setShowGame(true)}
            className={cn("group relative", !isMobile && "cursor-pointer")}
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
            <div className="overflow-x-auto py-1">
              <div className="min-w-[700px]">
                {/* Month labels */}
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

                {/* Contribution grid */}
                <div className="grid grid-flow-col auto-cols-fr gap-[3px] w-full">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                      {week.map((day, dayIndex) => (
                        <motion.div
                          key={day.date}
                          initial={{
                            opacity: 0,
                            scale: 0.25,
                            filter: "blur(4px)",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.2,
                            delay: weekIndex * 0.01 + dayIndex * 0.005,
                          }}
                          className={cn(
                            "aspect-square rounded-[2px] cursor-pointer transition-all duration-150 hover:ring-1 hover:ring-foreground/30",
                            getContributionClass(
                              getContributionLevel(day.count),
                            ),
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

            {/* Tooltip */}
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "absolute z-10 px-2 py-1 text-xs bg-popover text-popover-foreground border border-border shadow-lg pointer-events-none whitespace-nowrap rounded-sm",
                  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-sm)-1px)]",
                  "before:shadow-[0_-1px_0_0_rgba(0,0,0,0.2)] dark:before:shadow-[0_-1px_0px_0_rgba(255,255,255,0.2)]",
                )}
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <span className="font-medium">
                  {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  on {formatDate(tooltip.date)}
                </span>
              </motion.div>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-muted-foreground sm:tracking-normal tracking-tighter">
                {data.total} activities last year
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

            {/* Click me hint - hidden on mobile */}
            {!isMobile && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6.5 backdrop-blur-3xl border border-border p-0.5 px-1 bg-muted rounded-sm flex opacity-0 group-hover:opacity-100 items-center justify-center pointer-events-none transition-opacity duration-200 gap-1.5">
                <span className="text-xs text-muted-foreground font-medium tracking-wide">
                  click
                </span>
                <CursorClickIcon className="size-3.5" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CONTRIBUTION_CLASSES: Record<number, string> = {
  0: "bg-muted",
  1: "bg-foreground/30",
  2: "bg-foreground/50",
  3: "bg-foreground/70",
  4: "bg-foreground/90",
};

const getContributionClass = (level: number): string => {
  return CONTRIBUTION_CLASSES[level] ?? CONTRIBUTION_CLASSES[0];
};

export default GitHubGraph;
