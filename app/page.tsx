import Header from "@/components/layout/header";
import About from "@/components/features/about";
import Socials from "@/components/features/socials";
import GitHubGraph from "@/components/features/github-graph";
import { ExperienceCard } from "@/components/features/experience/experience-card";
import ToolsFlex from "@/components/features/tools-flex";
import Projects from "@/components/features/projects";
import Section from "@/components/layout/section";
import Footer from "@/components/layout/footer";
import JsonLd from "@/components/seo/json-ld";
import experienceData from "@/data/experience.json";
import toolsData from "@/data/tools.json";
import projectsData from "@/data/projects.json";

const Page = () => {
  return (
    <>
      <JsonLd />
      <main className="min-h-screen flex justify-center relative mx-2">
        <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono *:last:mb-2 *:last:sm:mb-3">
          <Header />
          <Section label="Hello">
            <About />
          </Section>
          <Section label="Socials">
            <Socials />
            <GitHubGraph />
          </Section>
          <Section label="Tools">
            <ToolsFlex data={toolsData} />
          </Section>
          <Section label="Experiences" link="/work" linkLabel="Details">
            <div className="flex flex-col">
              {experienceData.map((item) => (
                <ExperienceCard key={item.id} item={item} />
              ))}
            </div>
          </Section>
          <Section label="Projects">
            <Projects data={projectsData} />
          </Section>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Page;
