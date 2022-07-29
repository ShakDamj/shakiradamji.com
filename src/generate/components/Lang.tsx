import React, { isValidElement } from 'react';
import { usePageUtils } from './PageUtils.tsx';
import { RawHtml } from './RawHtml.tsx';

const uniq = <T,>(x: T[]) => Array.from(new Set(x));
const arrayMap: Record<Language, number> = { en: 0, es: 1 };

export type Language = 'en' | 'es';

export type Translatable = Record<Language, string> | string[] | string;

export type ValidTr =
  | Translatable
  | JSX.Element
  | (JSX.Element | string | null)[];

export type LangProps = { tr: ValidTr } | { en: string; es: string };

export function useLang() {
  return usePageUtils().lang;
}

export function useTr(en: string, es: string) {
  const lang = useLang();
  const values = { en, es };
  return values[lang] || 'MISSING TRANSLATION';
}

export function Lang(props: LangProps) {
  const value = 'tr' in props ? props.tr : props;
  const lang = useLang();

  if (!value) {
    return null;
  }

  if (isJsxElement(value)) {
    return value as JSX.Element;
  }

  const html = tr(value, lang);
  return <RawHtml html={html} />;
}

export function tr(value: null | undefined, lang: Language): null;
export function tr(value: Translatable, lang: Language): string;
export function tr(value: Translatable | null | undefined, lang: Language) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[arrayMap[lang]] || value[0] || 'MISSING TRANSLATION';
  }

  return value[lang] || value.en || 'MISSING TRANSLATION';
}

export function i18n(parts: TemplateStringsArray, ...params: Translatable[]) {
  const requireTr = params.filter((x) => typeof x !== 'string');

  if (!requireTr.length) {
    return String.raw(parts, ...params);
  }

  const languages = uniq(
    requireTr.flatMap((x) => Object.keys(x))
  ) as Language[];

  const values = languages.map((lang) => [
    lang,
    String.raw(parts, ...params.map((x) => tr(x, lang))),
  ]);

  return Object.fromEntries(values);
}

function isJsxElement(
  // deno-lint-ignore no-explicit-any
  target: any
): target is JSX.Element | (JSX.Element | string | null)[] {
  if (isValidElement(target)) {
    return true;
  }

  if (!Array.isArray(target)) {
    return false;
  }

  const hasJsx = target.some(isValidElement);

  return (
    hasJsx &&
    target.every(
      (x) => x === null || typeof x === 'string' || isValidElement(x)
    )
  );
}
