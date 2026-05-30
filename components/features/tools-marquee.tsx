import { cn } from "@/lib/utils";
import ToolBadge from "@/components/features/tool-badge";
import type { Tool } from "@/lib/types";

interface MarqueeProps {
  data: Tool[];
  className?: string;
}

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
  return (
    <div className={cn("tools-marquee relative overflow-hidden w-full", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="tools-marquee-track flex gap-3 w-max">
        <MarqueeContent data={data} />
        <MarqueeContent data={data} />
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .tools-marquee-track {
          animation: marquee 40s linear infinite;
        }

        .tools-marquee:hover .tools-marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
