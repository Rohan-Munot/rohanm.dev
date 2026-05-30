import type { Metadata } from "next";
import ToolBadge from "@/components/features/tool-badge";
import toolsData from "@/data/tools.json";
import type { Tool } from "@/lib/types";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import BackButton from "@/components/ui/back-button";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Technologies and tools I use daily — React, Next.js, TypeScript, Tailwind CSS, and more for frontend development.",
};

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
  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono pb-2 sm:pb-3">
        <div className="p-4 dashed-border-x mt-2 sm:mt-3 flex items-center justify-between">
          <BackButton />
          <ThemeToggle />
        </div>

        <div className="flex flex-col gap-6 p-4 dashed-border-x mb-2 sm:mb-3">
          <h1 className="text-xs font-medium text-muted-foreground">
            Tools
          </h1>

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
        <Footer />
      </div>
    </main>
  );
};

export default ToolsPage;
