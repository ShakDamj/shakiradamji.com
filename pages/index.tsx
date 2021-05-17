import { Experiments, ExperimentsProps } from '../src/chunks/Experiments';
import { Header } from '../src/chunks/Header';
import { Navigation } from '../src/chunks/Navigation';
import {
  ProfessionalExperiences,
  ProfessionalExperiencesProps
} from '../src/chunks/ProfessionalExperience';
import { Projects, ProjectsProps } from '../src/chunks/Projects';
import { Talks, TalksProps } from '../src/chunks/Talks';
import { loadAllMds, loadMd } from '../src/data';

// export const config = { amp: true };

export async function getStaticProps(): Promise<{ props: IndexProps }> {
  return {
    props: {
      jobPositions: await loadAllMds('jobHistory'),
      talks: await loadAllMds('talks'),
      experiments: await loadAllMds('experiments'),
      projects: await Promise.all([
        loadMd('projects/better-gist'),
        loadMd('projects/lulas'),
        loadMd('projects/mud'),
        loadMd('projects/genara'),
      ]),
    },
  };
}

export type IndexProps = ExperimentsProps & ProjectsProps & ProfessionalExperiencesProps & TalksProps;

export default function Index(props: IndexProps) {
  return (
    <>
      <Navigation />
      <Header />
      <div className="container">
        <ProfessionalExperiences jobPositions={props.jobPositions} />
        <Projects projects={props.projects} />
        <Talks talks={props.talks} />
        <Experiments experiments={props.experiments} />
      </div>
    </>
  );
}
