import { ExperienceHeader } from "./experience-header";
import { ExperienceBullets } from "./experience-bullets";

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  description: string[];
  startDate: string;
  endDate: string | null;
  logo: string;
  tools?: string[];
  url: string | null;
}

export const ExperienceContent = ({ item }: { item: ExperienceItem }) => (
  <div className="py-4 flex flex-col sm:gap-3 gap-1.5">
    <ExperienceHeader item={item} />
    <div className="pl-13.5 flex flex-col gap-2.5">
      <ExperienceBullets items={item.description} tools={item.tools} />
    </div>
  </div>
);
