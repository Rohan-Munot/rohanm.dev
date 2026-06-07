import { ArrowBendDoubleUpRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  label?: string;
  link?: string;
  children: ReactNode;
  className?: string;
  linkLabel?: string;
}

const Section = ({ label, link, children, className, linkLabel = 'All' }: SectionProps) => {
  return (
    <div className={cn("p-4 dashed-border-x", className)}>
      <div className="flex flex-col gap-2">
        {(label || link) && (
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>
            {label}
          </span>
          {link && (
            <Link
              href={link}
              className="flex items-center justify-center gap-1 "
              >
                {linkLabel}
            <ArrowBendDoubleUpRightIcon  className="size-3.5 text-foreground" />
            </Link>
          )}
        </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Section;
