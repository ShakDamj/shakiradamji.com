import React from 'react';
import { Translatable, useLang, RawHtml, tr } from '../../generate/mod.ts';
import { cssDeps, cssGlobal, cssReset } from '../../theme.ts';

export interface AmqDocumentProps {
  className?: string;
  styles?: string;
  title: Translatable;
}

const thirdPartyCss = await Promise.all(
  cssDeps.map(async (x) => {
    const response = await fetch(x);
    return response.text();
  })
);

export function AmqDocument({
  className = '',
  styles,
  title,
  children,
}: React.PropsWithChildren<AmqDocumentProps>) {
  // throw new Error('polla');
  const lang = useLang();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="A. Matías Quezada's personal website"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`${tr(title, lang)} | A. Matías Quezada`}</title>
        {injectStyle(cssReset)}
        {injectStyle(thirdPartyCss.join('\n'))}
        {injectStyle(cssGlobal)}
        {injectStyle(styles)}
        {injectStyle('STYLES_PLACEHOLDER')}
      </head>
      <body className={className}>{children}</body>
    </html>
  );
}

function injectStyle(styles: string | null | undefined) {
  if (!styles) return null;

  return (
    <style>
      <RawHtml html={styles.replace(/\s+/g, ' ')} />
    </style>
  );
}
