import React from 'react';

import { Runtime } from './Runtime';

export type Language = 'en' | 'es';

export type TranslatableString = string | Record<Language, string>;

export interface TranslatableProps {
  value: TranslatableString;
  render?: (value: string) => JSX.Element;
}

export function Translatable({ value, render }: TranslatableProps) {
  if (value == null) {
    throw new Error(`Value is required you motherfucker: ${value}`);
  }

  const renderSomething = render || (x => <span>{x}</span>);

  return (
    <>
      <Runtime
        css={
          /*css*/ `
            [lang] {
              display: none;
            }

            .display-en [lang='en'] {
              display: inherit;
            }

            .display-es [lang='es'] {
              display: inherit;
            }
          `
        }
        js={
          /*js*/ `
            $('[data-language-toggle]').addEventListener('click', () => {
              const cl = document.body.classList

              if (cl.contains('display-en')) {
                cl.remove('display-en');
                cl.add('display-es');
              } else {
                cl.remove('display-es');
                cl.add('display-en');
              }
            });
          `
        }
      />

      {getContent()}
    </>
  );

  function getContent() {
    if (typeof value === 'string') {
      return render ? render(value) : <>{value}</>;
    }

    return Object.entries(value).map(([lang, text]) => create(text, lang as Language));
  }

  function create(text: string, lang: Language): JSX.Element {
    const element = renderSomething(text);
    const key = element.key ? `${element.key}-${lang}` : lang;
    return { ...element, props: { ...element.props, lang }, key };
  }
}
