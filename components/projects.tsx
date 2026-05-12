"use client";

import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { ArrowSquareOutIcon, GithubLogoIcon } from "@phosphor-icons/react";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string | null;
  github: string | null;
  tools: string[];
}

interface ProjectsProps {
  data: Project[];
  className?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group relative flex flex-col gap-3 p-4 bg-muted/30 border border-border/30 transition-all duration-300">
      {/* Corner brackets */}
      <span className="absolute -top-px -left-px size-3 border-t border-l border-transparent group-hover:border-foreground/50 transition-colors duration-300" />
      <span className="absolute -top-px -right-px size-3 border-t border-r border-transparent group-hover:border-foreground/50 transition-colors duration-300" />
      <span className="absolute -bottom-px -left-px size-3 border-b border-l border-transparent group-hover:border-foreground/50 transition-colors duration-300" />
      <span className="absolute -bottom-px -right-px size-3 border-b border-r border-transparent group-hover:border-foreground/50 transition-colors duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-foreground">
            {project.name}
          </h3>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="View on GitHub"
            >
              <GithubLogoIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="Visit project"
            >
              <ArrowSquareOutIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tools.map((tool) => (
          <Badge key={tool}>{tool}</Badge>
        ))}
      </div>
    </div>
  );
};

const Projects = ({ data, className }: ProjectsProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
