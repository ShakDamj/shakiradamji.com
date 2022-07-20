import React from 'react';
import { AmqDocument } from '../components/templates/AmqDocument.tsx';
import { AmqHeader } from '../components/organisms/AmqHeader.tsx';
import { AmqPageList } from '../components/organisms/AmqPageList.tsx';
import { Container } from '../components/atoms/Container.tsx';
import { getAllPagesBySection } from '../util/getAllPagesBySection.ts';

const sections = await getAllPagesBySection();

// deno-lint-ignore no-explicit-any
export default (props: any) => {
  return (
    <AmqDocument {...props}>
      <AmqHeader />

      <Container>
        {/* <p>Welcome to my corner of the internet.</p> */}

        <AmqPageList name="✍️  Blog" list={sections.blog} />

        <AmqPageList
          name={{ en: '👨‍💻  Career', es: '👨‍💻  Experiencia' }}
          list={sections.career}
        />

        <AmqPageList
          name={{ en: '🐹  Projects', es: '🐹  Proyectos' }}
          list={sections.projects}
        />

        <AmqPageList
          name={{ en: '🧪  Experiments', es: '🧪  Experimentos' }}
          list={sections.experiments}
        />

        <AmqPageList
          name={{ en: '💬  Talks', es: '💬  Charlas' }}
          list={sections.talks}
        />
      </Container>
    </AmqDocument>
  );
};
