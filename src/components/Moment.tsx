import React from 'react';

import { Month } from '../types';
import { Translatable, TranslatableString } from './Translatable';

export interface MomentProps {
  month: Month;
}

const months: TranslatableString[] = [
  { en: 'Jan', es: 'Ene' },
  'Feb',
  'Mar',
  { en: 'Apr', es: 'Abr' },
  'May',
  'Jun',
  'Jul',
  { en: 'Aug', es: 'Ago' },
  'Sep',
  'Oct',
  'Nov',
  { en: 'Dec', es: 'Dic' },
];

export function Moment(props: MomentProps) {
  // const date = value === 'current' ? getToday() : value;
  const value = props.month;
  const [year, month] = value.split('-');
  const text = months[parseInt(month, 10) - 1];

  if (!text) {
    throw new Error(`Unknown month ${value}: ${year}-${month} (${text})`);
  }

  return (
    <time dateTime={value}>
      <Translatable value={text} /> {year.substr(2)}
    </time>
  );
}

// function getToday() {
//   const now = new Date();
//   return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
// }
