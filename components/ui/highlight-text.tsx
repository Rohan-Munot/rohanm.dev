import * as React from "react";

import { cn } from "@/lib/utils";

export interface HighlightProps {
  children: React.ReactNode;
  color?: string;
  startOpacity?: number;
  endOpacity?: number;
  angle?: number;
  roughness?: number;
  seed?: number;
  className?: string;
}

export function Highlight({
  children,
  color = "#fde68a",
  startOpacity = 0.35,
  endOpacity = 0.9,
  angle = 0.8,
  roughness = 4,
  seed = 7,
  className,
}: HighlightProps) {
  const uid = React.useId().replace(/:/g, "");
  const gradientId = `highlight-grad-${uid}`;
  const filterId = `highlight-${uid}`;

  const start = Math.max(0, Math.min(1, startOpacity));
  const end = Math.max(0, Math.min(1, endOpacity));

  return (
    <span className={cn("relative isolate inline-block", className)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute z-1 block"
        style={{
          top: "-0.05em",
          left: "-0.15em",
          width: "calc(100% + 0.3em)",
          height: "calc(100% + 0.1em)",
          transform: `rotate(${angle}deg)`,
          mixBlendMode: "multiply",
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={start} />
            <stop offset="100%" stopColor={color} stopOpacity={end} />
          </linearGradient>
          <filter
            id={filterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.05"
              numOctaves={2}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={roughness}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${gradientId})`}
          filter={`url(#${filterId})`}
        />
      </svg>
      <span className="relative z-0">{children}</span>
    </span>
  );
}
