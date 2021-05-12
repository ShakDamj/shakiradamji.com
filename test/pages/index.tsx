import React from 'https://esm.sh/react';

import { Header } from '../../components/Header.tsx';
import { Navigation } from '../../components/Navigation.tsx';
import { ProfessionalExperienceSummary } from '../../pages/index/ProfessionalExperienceSummary.tsx';
import { Document } from '../layout/Document.tsx';

export function Index() {
  return (
    <Document>
      <Header />
      <Navigation />
      <ProfessionalExperienceSummary />
    </Document>
  );
}
