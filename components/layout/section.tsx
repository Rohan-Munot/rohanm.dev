import { ReactNode } from "react";

interface SectionProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ label, children, className }: SectionProps) => {
  return (
    <div className={`p-4 dashed-border-x ${className ?? ""}`}>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
};

export default Section;
