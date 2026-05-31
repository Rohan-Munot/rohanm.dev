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
    <div className={cn("group relative overflow-hidden w-full mask-[linear-gradient(to_right,transparent_0px,black_96px,black_calc(100%-96px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0px,black_96px,black_calc(100%-96px),transparent_100%)]", className)}>
      <div className="flex gap-3 w-max animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeContent data={data} />
        <MarqueeContent data={data} />
      </div>
    </div>
  );
};

export default Marquee;
