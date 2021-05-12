import React, { PropsWithChildren } from 'https://esm.sh/react';

export interface DocumentProps {
  bodyClassName?: string;
  css: string;
  js: string;
}

export function Document({ css, js, children, bodyClassName }: PropsWithChildren<DocumentProps>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>A. Matías Quezada</title>
        {css ? <style type="text/css" dangerouslySetInnerHTML={{ __html: css }} /> : null}
      </head>
      <body className={bodyClassName}>
        {children}
        {js ? <script type="text/javascript" dangerouslySetInnerHTML={{ __html: js }} /> : null}
      </body>
    </html>
  );
}
