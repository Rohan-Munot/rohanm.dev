import Header from "@/components/header";
import GitHubGraph from "@/components/github-graph";
import Experience from "@/components/experience";
import Marquee from "@/components/marquee";
import Projects from "@/components/projects";
import experienceData from "@/data/experience.json";
import toolsData from "@/data/tools.json";
import projectsData from "@/data/projects.json";

const Page = () => {
  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono">
        <Header />
        <div className="p-4 dashed-border-x">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Tools
            </span>
            <Marquee data={toolsData} />
          </div>
        </div>
        <div className="p-4 dashed-border-x">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Experiences
            </span>
            <Experience data={experienceData} />
          </div>
        </div>
        <div className="p-4 dashed-border-x">
          <GitHubGraph />
        </div>
        <div className="p-4 dashed-border-x mb-2 sm:mb-3">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Projects
            </span>
            <Projects data={projectsData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
