import React from 'react';
import { AmqDocument } from '../templates/AmqDocument.tsx';
import { AmqHeader } from '../organisms/AmqHeader.tsx';
import { getAllPages, getPagesBySection } from '../generate/pages.ts';
import { AmqPageList } from '../organisms/AmqPageList.tsx';
import { Container } from '../atoms/Container.tsx';

const sections = getPagesBySection(await getAllPages());

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />
      <Container>
        <AmqPageList name="Blog" list={sections.blog} />
        <AmqPageList name={{ en: 'Career', es: 'Experiencia' }} list={sections.career} />
        <AmqPageList name={{ en: 'Experiments', es: 'Experimentos' }} list={sections.experiments} />
        <AmqPageList name={{ en: 'Projects', es: 'Proyectos' }} list={sections.projects} />
        <AmqPageList name={{ en: 'Talks', es: 'Charlas' }} list={sections.talks} />
      </Container>
    </AmqDocument>
  );
};
