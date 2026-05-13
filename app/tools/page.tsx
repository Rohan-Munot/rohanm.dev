"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import ToolBadge from "@/components/features/tool-badge";
import toolsData from "@/data/tools.json";
import type { Tool } from "@/lib/types";

const categoryOrder = [
  "core stack",
  "frameworks",
  "Tools",
  "Softwares",
  "platforms",
];

const grouped = categoryOrder.reduce<Record<string, Tool[]>>((acc, cat) => {
  const items = (toolsData as Tool[]).filter((tool) => tool.category === cat);
  if (items.length > 0) acc[cat] = items;
  return acc;
}, {});

const ToolsPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono pb-2 sm:pb-3">
        <div className="p-4 dashed-border-x">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-max cursor-pointer"
          >
            <ArrowLeftIcon className="size-4" />
            <span>Back</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 p-4 dashed-border-x mb-2 sm:mb-3">
          <span className="text-xs font-medium text-muted-foreground">
            Tools
          </span>

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-3">
              <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((tool) => (
                  <ToolBadge key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ToolsPage;
