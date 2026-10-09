import Link from "next/link";
import Badge from "@/components/ui/badge";

function LinkedText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;

    return (
      <Link
        key={i}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="custom-dotted-underline font-medium text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {match[1]}
      </Link>
    );
  });
}

const ExperienceBullets = ({
  items,
  tools,
  showTools = true,
}: {
  items: string[];
  tools?: string[];
  showTools?: boolean;
}) => {
  return (
    <>
      {items.length > 0 && (
        <ul className="text-sm leading-relaxed text-foreground/80 tracking-tight">
          {items.map((point, i) => (
            <li
              key={i}
              className="relative pl-3.5 before:absolute before:left-0 before:top-3 before:h-px before:w-2 before:border-t before:border-dashed before:border-muted-foreground"
            >
              <LinkedText text={point} />
            </li>
          ))}
        </ul>
      )}
      {tools && tools.length > 0 && showTools && (
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

export default ExperienceBullets;
