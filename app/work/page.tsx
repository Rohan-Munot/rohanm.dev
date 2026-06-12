import type { Metadata } from "next";
import experienceData from "@/data/experience.json";
import ExperienceCard from "@/components/features/experience/experience-card";
import ThemeToggle from "@/components/ui/theme-toggle";
import BackButton from "@/components/ui/back-button";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Frontend development experience at Clinikally (YC 22), BrandContext, and Novillex — building performant web applications with React and Next.js.",
};

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
            <h1 className="text-xs font-medium text-muted-foreground">
              Experience
            </h1>
            <div className="flex flex-col">
              {experienceData.map((item) => (
                <ExperienceCard key={item.id} item={item} defaultOpen />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default WorkPage;
