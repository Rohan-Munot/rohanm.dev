"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import experienceData from "@/data/experience.json";
import Link from "next/link";

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const WorkPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono">
        <div className="p-4 dashed-border-x">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-max cursor-pointer"
          >
            <ArrowLeftIcon className="size-4" />
            <span>Back</span>
          </button>
        </div>

        <div className="p-4 dashed-border-x mb-2 sm:mb-3">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Experience
            </span>

            <div className="flex flex-col">
              {experienceData.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative pl-6 pb-10",
                    index === experienceData.length - 1 && "pb-0",
                  )}
                >
                  {index !== experienceData.length - 1 && (
                    <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border" />
                  )}

                  <div className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-border bg-background" />

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h1 className="font-medium text-foreground text-lg">{item.role}</h1>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(item.startDate)} —{" "}
                          {item.endDate ? formatDate(item.endDate) : "Present"}
                        </span>
                      </div>
                      {item.url ? (
                        <Link
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-max"
                        >
                          <span>{item.company}</span>
                          <ArrowSquareOutIcon className="size-3.5" />
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {item.company}
                        </span>
                      )}
                    </div>

                    {item.description.length > 0 && (
                      <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-4 space-y-1">
                        {item.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {item.tools && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.tools.map((tool) => (
                          <Badge key={tool}>{tool}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkPage;
