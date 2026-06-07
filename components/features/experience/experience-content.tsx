import ExperienceHeader from "./experience-header";
import ExperienceBullets from "./experience-bullets";
import type { ExperienceItem } from "@/lib/types";

const ExperienceContent = ({ item }: { item: ExperienceItem }) => (
  <div className="py-4 flex flex-col gap-2 border-b border-border last:border-0 border-dashed">
    <ExperienceHeader item={item} />
    <div className="sm:pl-13.5 flex flex-col gap-2.5">
      <ExperienceBullets items={item.description} tools={item.tools} />
    </div>
  </div>
);

export default ExperienceContent;