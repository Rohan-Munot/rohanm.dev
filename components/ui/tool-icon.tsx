import type { ComponentType, SVGProps } from "react";
import { CodeIcon } from "@phosphor-icons/react/dist/ssr";
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
  IconBrandReact,
  IconBrandReactNative,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVscode,
} from "@tabler/icons-react";
import { IconExpo, IconTanstackQuery, IconZustand } from "@/components/ui/icons";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

const IconSqlAsset = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path
      fill="currentColor"
      d="M8.562 15.256A21.159 21.159 0 0 0 16 16.449a21.159 21.159 0 0 0 7.438-1.194c1.864-.727 2.525-1.535 2.525-2V9.7a10.357 10.357 0 0 1-2.084 1.076A22.293 22.293 0 0 1 16 12.078a22.36 22.36 0 0 1-7.879-1.3A10.28 10.28 0 0 1 6.037 9.7v3.55c0 .474.663 1.278 2.525 2.006Zm0 6.705a15.611 15.611 0 0 0 2.6.741a24.9 24.9 0 0 0 4.838.453a24.9 24.9 0 0 0 4.838-.452a15.614 15.614 0 0 0 2.6-.741c1.864-.727 2.525-1.535 2.525-2v-3.39a10.706 10.706 0 0 1-1.692.825A23.49 23.49 0 0 1 16 18.74a23.49 23.49 0 0 1-8.271-1.348a10.829 10.829 0 0 1-1.692-.825v3.393c0 .466.663 1.271 2.525 2.001ZM16 30c5.5 0 9.963-1.744 9.963-3.894v-2.837a10.5 10.5 0 0 1-1.535.762l-.157.063A23.487 23.487 0 0 1 16 25.445a23.422 23.422 0 0 1-8.271-1.351c-.054-.02-.106-.043-.157-.063a10.5 10.5 0 0 1-1.535-.762v2.837C6.037 28.256 10.5 30 16 30Z"
    />
    <ellipse cx="16" cy="5.894" fill="currentColor" rx="9.963" ry="3.894" />
  </svg>
);

const IconExpressJsAsset = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="m13.78 16.92 3.35-4.54.42.55 2.87 4a1.26 1.26 0 0 0 1.58.6l-4-5.33a.56.56 0 0 1 0-.82l2.1-2.74 1.55-2a1.18 1.18 0 0 0-1.49.55l-3 4-3-4a1.31 1.31 0 0 0-1.58-.55l4 5.2-4.29 5.77a1.23 1.23 0 0 0 1.49-.69M9.93 7.19a4.81 4.81 0 0 0-7.57 2.73L2 11.65v1a5 5 0 0 1 .11.57 5.42 5.42 0 0 0 1.37 3.2 5.24 5.24 0 0 0 6.09.78 4.49 4.49 0 0 0 2.15-3.3c-.52-.16-.81-.07-1 .49a3.36 3.36 0 0 1-2.15 2.39c-3.25 1.09-5.8-1.05-5.66-4.59h8.9c.1-2-.3-3.76-1.88-5m-7 4.22C3 8.77 4.76 7 7.16 7c2.18 0 3.77 1.84 3.83 4.4z"
    />
  </svg>
);

const IconDrizzleAsset = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6.13 10.67c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19L4.93 11c.24-.42.78-.57 1.2-.33M12.21 6.9c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19l2.82-4.92c.24-.42.78-.57 1.2-.33M21.56 6.9c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19l2.82-4.92c.24-.42.78-.57 1.2-.33M15.48 10.67c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19L14.28 11c.24-.42.78-.57 1.2-.33"
    />
  </svg>
);

const IconBetterAuthAsset = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M12.1 10.36H15.15V13.68H12.1z" />
    <path
      fill="currentColor"
      d="m3 3v18h18V3H3Zm15.48 10.68v3H12.1v-3H8.62v3H5.49V7.36h3.13v3h3.48v-3h6.38v6.32Z"
    />
  </svg>
);

const IconCursorAsset = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="m20.42 6.73-8-4.62c-.26-.15-.57-.15-.83 0L3.58 6.73c-.22.12-.35.36-.35.61v9.32c0 .25.13.48.35.61l8.01 4.62c.26.15.57.15.83 0l8.01-4.62c.22-.12.35-.36.35-.61V7.34c0-.25-.13-.48-.35-.61Zm-.5.98-7.73 13.39c-.05.09-.19.05-.19-.05v-8.77c0-.18-.09-.34-.25-.43L4.16 7.47c-.09-.05-.05-.19.05-.19h15.46c.22 0 .36.24.25.43Z"
    />
  </svg>
);

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  BrandReact: IconBrandReact,
  BrandTypescript: IconBrandTypescript,
  BrandNextjs: IconBrandNextjs,
  BrandTailwind: IconBrandTailwind,
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
  SqlAsset: IconSqlAsset,
  ExpressJsAsset: IconExpressJsAsset,
  DrizzleAsset: IconDrizzleAsset,
  BetterAuthAsset: IconBetterAuthAsset,
  CursorAsset: IconCursorAsset,
};

export const ToolIcon = ({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) => {
  const Icon = name ? iconMap[name] : null;

  return Icon ? (
    <Icon className={className} />
  ) : (
    <CodeIcon className={className} />
  );
};
