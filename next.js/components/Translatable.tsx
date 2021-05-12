import React from 'https://esm.sh/react';

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

  if (typeof value === 'string') {
    return render ? render(value) : <>{value}</>;
  }

  const renderSomething = render || (x => <span>{x}</span>);

  return <>{Object.entries(value).map(([lang, text]) => create(text, lang as Language))}</>;

  function create(text: string, lang: Language) {
    const element = renderSomething(text);
    const key = element.key ? `${element.key}-${lang}` : lang;
    return { ...element, props: { ...element.props, lang }, key };
  }
}
