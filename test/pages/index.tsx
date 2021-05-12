import React from 'https://esm.sh/react';

import { Header } from '../../components/Header.tsx';
import { Navigation } from '../../components/Navigation.tsx';
import { ProfessionalExperienceSummary } from '../../pages/index/ProfessionalExperienceSummary.tsx';
import { Document } from '../layout/Document.tsx';
import { requireCss, requireScript } from '../layout/loaders.ts';

// TODO: implement
export const css = await requireCss(import.meta.url, './index.css');
export const js = await requireScript(import.meta.url, './index.js');

export function Page() {
  return <Document>test</Document>;
}
