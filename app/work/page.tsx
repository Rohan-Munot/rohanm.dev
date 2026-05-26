import experienceData from "@/data/experience.json";
import Experience from "@/components/features/experience";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import BackButton from "@/components/ui/back-button";

const WorkPage = () => {
  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono">
        <div className="p-4 dashed-border-x mt-2 sm:mt-3 flex items-center justify-between">
          <BackButton />
          <ThemeToggle />
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
