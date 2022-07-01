import React from 'react';
import { Lang } from '../atoms/Lang.tsx';
import { cssGlobal, cssReset } from '../theme.ts';

export interface AmqDocumentProps {
  className?: string;
  title: string;
}

export function AmqDocument({ className = '', title, children }: React.PropsWithChildren<AmqDocumentProps>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          <Lang tr={title} />
        </title>
        <style>
          {cssReset}
          {cssGlobal}
        </style>
        <style>STYLES_PLACEHOLDER</style>
      </head>
      <body className={className}>{children}</body>
    </html>
  );
}
