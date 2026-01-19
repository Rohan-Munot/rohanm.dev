"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/badge";

// Phosphor Icons
import { CodeIcon } from "@phosphor-icons/react";

import {
  IconBrandReact,
  IconBrandTypescript,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandNodejs,
  IconBrandGit,
  IconBrandFigma,
  IconBrandFramer,
} from "@tabler/icons-react";

import { IconExpo, IconTanstackQuery, IconZustand } from "@/components/icons";

interface Tool {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

interface MarqueeProps {
  data: Tool[];
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BrandReact: IconBrandReact,
  BrandTypescript: IconBrandTypescript,
  BrandNextjs: IconBrandNextjs,
  BrandTailwind: IconBrandTailwind,
  BrandNodejs: IconBrandNodejs,
  BrandGit: IconBrandGit,
  BrandFigma: IconBrandFigma,
  BrandFramer: IconBrandFramer,
  Expo: IconExpo,
  TanstackQuery: IconTanstackQuery,
  Zustand: IconZustand,
};

const ToolBadge = ({ tool }: { tool: Tool }) => {
  const Icon = tool.icon ? iconMap[tool.icon] : null;

  return (
    <Badge
      render={
        <Link href={tool.url} target="_blank" rel="noopener noreferrer" />
      }
      className="cursor-pointer hover:bg-muted transition-colors duration-200"
    >
      {Icon ? (
        <Icon className="w-4 h-4 opacity-70" />
      ) : (
        <CodeIcon className="w-4 h-4 opacity-70" />
      )}
      {tool.name}
    </Badge>
  );
};

const MarqueeContent = ({ data }: { data: Tool[] }) => {
  return (
    <>
      {data.map((tool, index) => (
        <ToolBadge key={`${tool.id}-${index}`} tool={tool} />
      ))}
    </>
  );
};

const Marquee = ({ data, className }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedData = [...data, ...data, ...data];

  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex gap-3 w-max"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          animation: `marquee 30s linear infinite ${isPaused ? "paused" : "running"}`,
        }}
      >
        <MarqueeContent data={duplicatedData} />
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
