"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import experienceData from "@/data/experience.json";
import Experience from "@/components/features/experience";

const WorkPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono">
        <div className="p-4 dashed-border-x mt-2 sm:mt-3">
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
            <Experience data={experienceData} showAll={true} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkPage;
