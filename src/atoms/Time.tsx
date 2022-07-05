import React from 'react';
import { css } from '../deps/emotion.ts';
import { useLang, YearMonthDay } from '../generate/mod.ts';
import { cssColor, cssFontFamily } from '../theme.ts';

function useLocale() {
  const lang = useLang();
  const locales = {
    en: 'en-US',
    es: 'es-ES',
  };
  return locales[lang] || 'default';
}

export interface TimeProps {
  className?: string;
  value: YearMonthDay | Date | null;
  omitDay?: boolean;
}

export function Time({ className = '', value, omitDay = false }: TimeProps) {
  if (!value) return null;

  const dateStyles = css`
    opacity: 0.8;
    font-family: ${cssFontFamily.code};
    color: ${cssColor.foreground};
  `;

  return (
    <time
      className={`${dateStyles} ${className}`}
      dateTime={formatDateTime(value)}
    >
      {printDate(value, { omitDay })}
    </time>
  );
}

function printDate(
  value: YearMonthDay | Date,
  { omitDay }: { omitDay: boolean }
) {
  const locale = useLocale();
  const [year, month, day] = decomposeDate(value);

  if (!month) {
    return `${year}`;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  let formatter: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (!day || omitDay) {
    formatter = {
      year: 'numeric',
      month: 'short',
    };
  }

  return new Intl.DateTimeFormat(locale, formatter)
    .format(date)
    .replace(/^[a-z]/g, (x) => x.toUpperCase())
    .replace(/Sept/, 'Sep');
}

function formatDateTime(value: YearMonthDay | Date) {
  const locale = useLocale();
  const [year, month, day] = decomposeDate(value);

  if (!month) {
    return `${year}`;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  let formatter: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (!day) {
    formatter = {
      year: 'numeric',
      month: '2-digit',
    };
  }

  return new Intl.DateTimeFormat(locale, formatter).format(date);
}

function decomposeDate(value: YearMonthDay | Date) {
  return typeof value === 'string'
    ? value.split('-').map((x) => parseInt(x, 10))
    : [value.getFullYear(), value.getMonth() + 1, value.getDate()];
}
