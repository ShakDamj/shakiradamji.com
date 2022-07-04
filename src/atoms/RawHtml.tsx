import React from 'react';
import { tr, Translatable, useLang } from './Lang.tsx';

export interface RawHtmlProps {
  html: Translatable | string | null | undefined;
}

export function RawHtml({ html = '' }: RawHtmlProps) {
  const lang = useLang();

  if (!html) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: `</script>${tr(html, lang)}<script>` }}
    />
  );
}
