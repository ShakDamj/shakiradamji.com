import React, { isValidElement } from 'react';
import { RawHtml } from './RawHtml.tsx';

export type Language = 'en' | 'es';

const arrayMap: Record<Language, number> = { en: 0, es: 1 };

const LangContext = React.createContext<Language>('en');

export const LangProvider = LangContext.Provider;

export type Translatable = Record<Language, string> | string;

export type ValidTr =
  | Translatable
  | JSX.Element
  | (JSX.Element | string | null)[];

export type LangProps = { tr: ValidTr } | { en: string; es: string };

export function useLang() {
  return React.useContext(LangContext);
}

export function useTr(en: string, es: string) {
  const lang = useLang();
  const values = { en, es };
  return values[lang] || 'MISSING TRANSLATION';
}

export function Lang(props: LangProps) {
  const tr = 'tr' in props ? props.tr : props;
  const lang = useLang();

  if (!tr) {
    return null;
  }

  if (typeof tr === 'string') {
    return <RawHtml html={tr} />;
  }

  if (isStringArray(tr)) {
    return <RawHtml html={tr[arrayMap[lang]]} />;
  }

  if (isJsxElement(tr)) {
    return tr as JSX.Element;
  }

  return <RawHtml html={tr[lang] || tr.en || 'INVALID TR'} />;
}

export function i18n(parts: TemplateStringsArray, ...params: Translatable[]) {
  const requireTr = params.filter((x) => typeof x !== 'string');

  if (!requireTr.length) {
    return String.raw(parts, ...params);
  }

  const langs = Array.from(new Set(requireTr.flatMap((x) => Object.keys(x))));
  const values = langs.map((lang) => {
    const langParams = params.map((x) =>
      typeof x === 'string' ? x : (x as any)[lang]
    );
    return [lang, String.raw(parts, ...langParams)];
  });

  return Object.fromEntries(values);
}

function isJsxElement(
  // deno-lint-ignore no-explicit-any
  target: any
): target is JSX.Element | (JSX.Element | string | null)[] {
  return (
    isValidElement(target) ||
    (Array.isArray(target) &&
      target.every(
        (x) => x === null || typeof x === 'string' || isValidElement(x)
      ))
  );
}

function isStringArray(target: any): target is string[] {
  return Array.isArray(target) && target.every((x) => typeof x === 'string');
}
