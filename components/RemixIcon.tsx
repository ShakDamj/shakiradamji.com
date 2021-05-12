import React from 'https://esm.sh/react';

import { TranslatableString } from './Translatable.tsx';

export interface RemixIconProps {
  name: string;
  title: TranslatableString;
  fill?: boolean;
}

export function RemixIcon({ name, title, fill }: RemixIconProps) {
  const paintMode = fill ? 'fill' : 'line';
  return <i className={`ri-${name}-${paintMode}`}></i>;
}
