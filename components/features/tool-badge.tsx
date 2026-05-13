import type { ComponentType } from "react";
import Link from "next/link";
import { CodeIcon } from "@phosphor-icons/react";
import {
  IconBrandCss3,
  IconBrandFigma,
  IconBrandFramer,
  IconBrandGit,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVscode,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { IconExpo, IconTanstackQuery, IconZustand } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/types";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  BrandReact: IconBrandReact,
  BrandTypescript: IconBrandTypescript,
  BrandNextjs: IconBrandNextjs,
  BrandTailwind: IconBrandTailwind,
  BrandNodejs: IconBrandNodejs,
  BrandGit: IconBrandGit,
  BrandFigma: IconBrandFigma,
  BrandFramer: IconBrandFramer,
  BrandJavascript: IconBrandJavascript,
  BrandHtml5: IconBrandHtml5,
  BrandCss3: IconBrandCss3,
  BrandReactNative: IconBrandReactNative,
  BrandMongodb: IconBrandMongodb,
  BrandVercel: IconBrandVercel,
  BrandGithub: IconBrandGithub,
  BrandVscode: IconBrandVscode,
  Expo: IconExpo,
  TanstackQuery: IconTanstackQuery,
  Zustand: IconZustand,
};

interface ToolBadgeProps {
  tool: Tool;
  className?: string;
}

const ToolBadge = ({ tool, className }: ToolBadgeProps) => {
  const Icon = tool.icon ? iconMap[tool.icon] : null;

  return (
    <Badge
      render={<Link href={tool.url} target="_blank" rel="noopener noreferrer" />}
      className={cn(
        "cursor-pointer hover:bg-muted transition-colors duration-200",
        className,
      )}
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

export default ToolBadge;
