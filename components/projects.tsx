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
    <div
      className={cn(
        "group relative flex flex-col gap-3 p-4 rounded-lg",
        "border border-border/50 bg-muted/30",
        "hover:border-border hover:bg-muted/50 transition-all duration-200",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-foreground group-hover:text-foreground/90 transition-colors">
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
