import React from 'react';

import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import css from './index.module.css';
import { ExperimentsSummary } from './index/Experiments';
import { PersonalProjectsSummary } from './index/PersonalProjects';
import { ProfessionalExperienceSummary } from './index/ProfessionalExperienceSummary';

export default function Index() {
  return (
    <>
      <Header />
      <Navigation />
      <ProfessionalExperienceSummary />
      <PersonalProjectsSummary />
      <ExperimentsSummary />
    </>
  );
}
