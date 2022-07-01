import React from 'react';
import { css } from '../deps/emotion.ts';
import { cssColor, cssFontSize } from '../theme.ts';

type FourDigits = `${number}${number}${number}${number}`;
type TwoDigits = `${number}${number}`;

export type YearMonthDay = `${FourDigits}` | `${FourDigits}-${TwoDigits}` | `${FourDigits}-${TwoDigits}-${TwoDigits}`;

export interface TimeProps {
  className?: string;
  value: YearMonthDay | Date | null;
  omitDay?: boolean;
}

export function Time({ className = '', value, omitDay = false }: TimeProps) {
  if (!value) return null;

  const dateStyles = css`
    opacity: 0.8;
    font-family: monospace;
    font-size: ${cssFontSize.xs};
    color: ${cssColor.foreground};
  `;
  // font-size: ${cssFontSize.sm};

  return (
    <time className={`${dateStyles} ${className}`} dateTime={formatDateTime(value)}>
      {printDate(value, { omitDay })}
    </time>
  );
}

function printDate(value: YearMonthDay | Date, { omitDay }: { omitDay: boolean }) {
  const [year, month, day] = decomposeDate(value);

  if (!month) {
    return year;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  if (!day || omitDay) {
    return new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short' }).format(date);
  }

  return new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

function formatDateTime(value: YearMonthDay | Date) {
  const [year, month, day] = decomposeDate(value);

  if (!month) {
    return `${year}`;
  }

  const date = new Date(year, (month || 1) - 1, day || 1);

  if (!day) {
    return new Intl.DateTimeFormat('default', { year: 'numeric', month: '2-digit' }).format(date);
  }

  return new Intl.DateTimeFormat('default', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

function decomposeDate(value: YearMonthDay | Date) {
  return typeof value === 'string'
    ? value.split('-').map(x => parseInt(x, 10))
    : [value.getFullYear(), value.getMonth() + 1, value.getDate()];
}
