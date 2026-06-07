export interface Tool {
  id: string;
  name: string;
  url: string;
  icon?: string | null;
  category: string;
}

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