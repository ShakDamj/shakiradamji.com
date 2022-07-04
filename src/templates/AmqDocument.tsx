import React from 'react';
import { Lang, Translatable } from '../atoms/Lang.tsx';
import { RawHtml } from '../atoms/RawHtml.tsx';
import { cssGlobal, cssReset } from '../theme.ts';

export interface AmqDocumentProps {
  className?: string;
  styles?: string;
  title: Translatable;
}

export function AmqDocument({
  className = '',
  styles,
  title,
  children,
}: React.PropsWithChildren<AmqDocumentProps>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          <Lang tr={title} /> | A. Matías Quezada
        </title>
        <style>
          {cssReset}
          {cssGlobal}
        </style>
        {styles ? <style children={<RawHtml html={styles} />} /> : null}
        <style>STYLES_PLACEHOLDER</style>
      </head>
      <body className={className}>{children}</body>
    </html>
  );
}
