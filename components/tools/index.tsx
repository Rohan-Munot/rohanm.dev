import type { Tool } from "@/lib/types";
import Badge from "@/components/ui/badge";
import Link from "next/link";
import ToolIcon from "@/components/ui/tool-icon";

interface ToolsFlexProps {
  data: Tool[];
  className?: string;
}

interface ToolBadgeProps {
  tool: Tool;
}

const Tools = ({ data, className }: ToolsFlexProps) => {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {data.map((tool, index) => (
        <ToolBadge key={`${tool.id}-${index}`} tool={tool} />
      ))}
    </div>
  );
};

export default Tools;

const ToolBadge = ({ tool }: ToolBadgeProps) => {
  return (
    <Badge
      render={
        <Link href={tool.url} target="_blank" rel="noopener noreferrer" />
      }
    >
      <ToolIcon name={tool.icon} className="w-4 h-4 opacity-70" />
      {tool.name}
    </Badge>
  );
};
