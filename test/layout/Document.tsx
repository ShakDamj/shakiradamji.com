import React, { PropsWithChildren } from 'https://esm.sh/react';

export interface DocumentProps {
  bodyClassName?: string;
}

export function Document({ children, bodyClassName }: PropsWithChildren<DocumentProps>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>A. Matías Quezada</title>
      </head>
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
