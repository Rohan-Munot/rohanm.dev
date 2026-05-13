import Header from "@/components/layout/header";
import Socials from "@/components/features/socials";
import GitHubGraph from "@/components/features/github-graph";
import Experience from "@/components/features/experience";
import Marquee from "@/components/features/marquee";
import Projects from "@/components/features/projects";
import Section from "@/components/layout/section";
import experienceData from "@/data/experience.json";
import toolsData from "@/data/tools.json";
import projectsData from "@/data/projects.json";

const Page = () => {
  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono">
        <Header />
        <Section label="Socials">
          <Socials />
          <GitHubGraph />
        </Section>
        <Section label="Tools">
          <Marquee data={toolsData} />
        </Section>
        <Section label="Experiences">
          <Experience data={experienceData} />
        </Section>
        <Section label="Projects" className="mb-2 sm:mb-3">
          <Projects data={projectsData} />
        </Section>
      </div>
    </main>
  );
};

export default Page;
