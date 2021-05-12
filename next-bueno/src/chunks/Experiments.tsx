import { Project, ProjectView } from '../components/Project';

export interface ExperimentsProps {
  experiments: Project[];
}

export function Experiments({ experiments }: ExperimentsProps) {
  return (
    <section className="experiments">
      {experiments.map(x => (
        <ProjectView {...x} />
      ))}
    </section>
  );
}
