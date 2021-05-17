import { CSSProperties } from 'react';

export function randomRotation(max = 2, min = 1) {
  const deg = Math.round(Math.random() * (max - min)) + min;
  const polarity = Math.random() > 0.5 ? 1 : -1;

  return {
    ['--rotation']: `${deg * polarity}deg`,
  } as CSSProperties;
}
