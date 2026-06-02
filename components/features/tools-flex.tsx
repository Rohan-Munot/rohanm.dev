import ToolBadge from "@/components/features/tool-badge";
import type { Tool } from "@/lib/types";

interface ToolsFlexProps {
  data: Tool[];
  className?: string;
}

const ToolsFlex = ({ data, className }: ToolsFlexProps) => {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {data.map((tool, index) => (
        <ToolBadge key={`${tool.id}-${index}`} tool={tool} />
      ))}
    </div>
  );
};

export default ToolsFlex;
