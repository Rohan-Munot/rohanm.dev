import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ToolIcon } from "@/components/ui/tool-icon";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/types";

interface ToolBadgeProps {
  tool: Tool;
  className?: string;
}

const ToolBadge = ({ tool, className }: ToolBadgeProps) => {
  return (
    <Badge
      render={<Link href={tool.url} target="_blank" rel="noopener noreferrer" />}
      className={cn(
        "cursor-pointer hover:bg-muted transition-colors duration-200",
        className,
      )}
    >
      <ToolIcon name={tool.icon} className="w-4 h-4 opacity-70" />
      {tool.name}
    </Badge>
  );
};

export default ToolBadge;
