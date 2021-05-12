import React from 'react';

import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { loadProject } from '../lib/projects';
import css from './index.module.css';
import { ExperimentsSummary } from './index/Experiments';
import {
  PersonalProjects,
  PersonalProjectsProps
} from './index/PersonalProjects';
import { ProfessionalExperienceSummary } from './index/ProfessionalExperienceSummary';

export default function Index(props: PersonalProjectsProps) {
  return (
    <>
      <Header />
      <Navigation />
      <ProfessionalExperienceSummary />
      <PersonalProjects projects={props.projects} />
      <ExperimentsSummary />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      projects: [
        await loadProject('projects/better-gist'),
        await loadProject('projects/lulas'),
        await loadProject('projects/mud'),
        await loadProject('projects/genara'),
      ],
    },
  };
}
