import React from 'react';
import { ShakDocument } from "../components/ShakDocument.tsx";
import {
  css,
  getMarkdownExtract,
  Lang,
  Markdown,
  MarkdownPageMetadata,
  MarkdownProps,
  PageMetadata,
  Script,
  tr,
  Translatable,
  useLang,
} from '../generate/mod.ts';
import { findPageByTitle } from '../util/findPageByTitle.ts';
import { getAllPagesBySection } from '../util/getAllPagesBySection.ts';
import { noindent } from '../util/noindent.ts';

const pages = await getAllPagesBySection();

const { career } = pages;
// const allTags = countAllTags();
// console.log([...allTags]);

const RELEVANT_FIRST = 3;

export default (props: PageMetadata) => {
  const styles = css`
    --color-primary: #00e;
    --color-foreground: #111;
    --color-foregroundStrong: #000;
    // --color-background: #fff;
    // --color-backgroundStrong: #eee;
    // --color-border: gray;

    font-size: 14px;

    a::after {
      display: none !important;
    }

    *,
    *::before,
    *::after {
      border: none !important;
      background: transparent !important;
    }

    .tag {
      color: inherit !important;
      font-size: 1.1rem;
    }

    header {
      display: flex;
      justify-content: space-between;
    }

    details:not([data-relevant]) {
      h3, summary + div {
        margin: 0;
      }
  `;

  const headerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  function Section({
    children,
    ...props
  }: MarkdownProps & { children: Translatable }) {
    return (
      <div data-block>
        <Markdown {...props}>{tr(children, useLang())}</Markdown>
      </div>
    );
  }

  return (
    <ShakDocument {...props} className={styles}>
      <header>
        <h1>A. Matías Quezada</h1>
        <h2>Software Engineer</h2>
      </header>

      <ol>
        {career.map((item, index) => (
          <li key={item.id} data-block>
            <details
              open
              data-relevant={index < RELEVANT_FIRST ? true : undefined}
            >
              <summary>
                
              </summary>


              {index < RELEVANT_FIRST ? (
                <Markdown>{item.content}</Markdown>
              ) : null}
            </details>
          </li>
        ))}
      </ol>

      <Section>
        {noindent`
          # Personal qualities

          **Good learning ability:** Self-taught programmer, raids on Software Architecture, Project Management and User Experience (UX).

          **Adapting to new technologies and methodologies:** In constant search for new ideas, concepts and tools to facilitate development and provide new features.

          **Passion for programming:** Programming is a door to a blank world waiting to be written, the feeling of a well-written, readable program that does it’s job is priceless.

          **Challenge-lover:** Difficulties should be faced as soon as possible, each overcome difficulty is one less obstacle in the future.
        `}
        {noindent`
          # Cualidades personales

          **Gran capacidad de aprendizaje:** Programador autodidacta, incursiones en Arquitectura de Software, Gestión de Proyectos y Experiencia de Usuario (UX).

          **Adaptación a nuevas tecnologías y metodologías:** En búsqueda constante de nuevas ideas, conceptos y herramientas que faciliten el desarrollo y proveer nuevas funcionalidades.

          **Pasión por la programación:** La programación es una puerta a un mundo en blanco esperando a ser escrito, la sensación de un programa bien escrito, legible y que cumple su función no tiene precio.

          **Gusto por los retos:** Las dificultades deben enfrentarse cuanto antes, cada dificultad superada es un obstáculo menos en el futuro.
        `}
      </Section>

      <Section>
        {noindent`
          # Links

          - Portfolio: https://amatiasq.com
          - Repositories: http://github.com/amatiasq
          - Linked In: http://es.linkedin.com/in/amatiasq/en
          - Updated CV: http://amatiasq.com/cv
          - CV in Spanish: http://amatiasq.com/es/cv
        `}
        {noindent`
          # Links

          - Portfolio: https://amatiasq.com/es
          - Repositorios: http://github.com/amatiasq
          - Linked In: http://es.linkedin.com/in/amatiasq
          - CV actualizado: http://amatiasq.com/es/cv
          - CV en Inglés: http://amatiasq.com/cv
        `}
      </Section>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"
        integrity="sha512-YcsIPGdhPK4P/uRW6/sruonlYj+Q7UHWeKfTAkBW+g83NKM+jMJFJ4iAPfSnVp7BKD4dKMHmVSvICUbE/V1sSw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <Script>
        {`
          html2pdf(document.body, {
            filename: 'A. Matías Quezada - CV.pdf',
            margin: 10,
            pagebreak: { mode: ['css', 'legacy'], avoid: '[data-block]' }
          }).then(() => {
            history.back();
          });
        `}
      </Script>
    </ShakDocument>
  );
};

// function countAllTags() {
//   const labels = Object.values(pages)
//     .flatMap((list) => list.flatMap((page) => page.labels))
//     .filter(Boolean) as Translatable[];

//   const total = new Map<Translatable, number>();

//   for (const label of labels) {
//     const count = total.get(label) || 0;
//     total.set(label, count + 1);
//   }

//   return [...total].sort((a, b) => b[1] - a[1]);
// }
