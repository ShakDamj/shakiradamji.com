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
      jobPositions: [],
      projects: await Promise.all([
        loadMd('projects/better-gist'),
        loadMd('projects/lulas'),
        loadMd('projects/mud'),
        loadMd('projects/genara'),
      ]),
      talks: await loadAllMds('talks'),
      experiments: await loadAllMds('experiments'),
    },
  };
}

export type IndexProps = ExperimentsProps & ProjectsProps & ProfessionalExperiencesProps & TalksProps;

export default function Index(props: IndexProps) {
  return (
    <>
      <Header />
      <Navigation />
      <ProfessionalExperiences jobPositions={props.jobPositions} />
      <Projects projects={props.projects} />
      <Talks talks={props.talks} />
      <Experiments experiments={props.experiments} />
    </>
  );
}

// import { Header } from '../components/Header';
// import { Navigation } from '../components/Navigation';
// import { loadProject } from '../lib/projects';
// import css from './index.module.css';
// import { ExperimentsSummary } from './index/Experiments';
// import {
//   PersonalProjects,
//   PersonalProjectsProps
// } from './index/PersonalProjects';
// import { ProfessionalExperienceSummary } from './index/ProfessionalExperienceSummary';

// export default function Index(props: PersonalProjectsProps) {
//   return (
//     <>
//       <Header />
//       <Navigation />
//       <ProfessionalExperienceSummary />
//       <PersonalProjects projects={props.projects} />
//       <ExperimentsSummary />
//     </>
//   );
// }

// export async function getStaticProps() {
//   return {
//     props: {
//       projects: [
//         await loadProject('projects/better-gist'),
//         await loadProject('projects/lulas'),
//         await loadProject('projects/mud'),
//         await loadProject('projects/genara'),
//       ],
//     },
//   };
// }
