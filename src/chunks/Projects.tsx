import { Project, ProjectView } from '../entities/Project';

export interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="projects">
      {projects.map(x => (
        <ProjectView {...x} />
      ))}
    </section>
  );
}
