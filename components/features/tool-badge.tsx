import Link from "next/link";
import Badge from "@/components/ui/badge";
import ToolIcon from "@/components/ui/tool-icon";
import type { Tool } from "@/lib/types";

interface ToolBadgeProps {
  tool: Tool;
}

const ToolBadge = ({ tool }: ToolBadgeProps) => {
  return (
    <Badge
      render={
        <Link
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      <ToolIcon name={tool.icon} className="w-4 h-4 opacity-70" />
      {tool.name}
    </Badge>
  );
};

export default ToolBadge;
