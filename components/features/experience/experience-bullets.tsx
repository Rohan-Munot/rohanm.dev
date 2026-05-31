import { Badge } from "@/components/ui/badge";

export const ExperienceBullets = ({
  items,
  tools,
}: {
  items: string[];
  tools?: string[];
}) => {
  return (
    <>
      {items.length > 0 && (
        <ul className="text-sm leading-relaxed space-y-1 text-foreground/80 tracking-wide">
          {items.map((point, i) => (
            <li
              key={i}
              className="relative pl-4 before:absolute before:left-0 before:top-3 before:h-px before:w-2 before:border-t before:border-dashed before:border-muted-foreground"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
      {tools && tools.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-foreground">Tools</span>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool, index) => (
              <Badge key={index}>{tool}</Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
