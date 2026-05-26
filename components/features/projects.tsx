"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowBendDoubleUpRightIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string | null;
  github: string | null;
  tools: string[];
  featured?: boolean;
}

interface ProjectsProps {
  data: Project[];
  className?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group border-t border-border border-dashed py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-3">
        {/* Title + Links */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground">
            {project.name}
          </h3>

          <div className="flex items-center gap-4 shrink-0">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`View ${project.name} on GitHub`}
              >
                <GithubLogoIcon className="size-4" />
                <span>Code</span>
              </Link>
            )}
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Visit ${project.name}`}
              >
                <span>Live</span>
                <ArrowBendDoubleUpRightIcon className="size-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <Badge key={tool}>{tool}</Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </div>
  );
};

const Projects = ({ data, className }: ProjectsProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
