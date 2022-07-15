import React from 'react';
import { usePageUtils, useLang } from '../../generate/mod.ts';

export function LangSelector() {
  const { Link, path } = usePageUtils();
  const lang = useLang();

  return (
    <>
      {lang !== 'en' ? <Link href={`/${path}`}>🇬🇧</Link> : null}
      {lang !== 'es' ? <Link href={`/es/${path}`}>🇪🇸</Link> : null}
      {/* {lang !== 'cat' ? <Link href={`/cat/${path}`}>CAT</Link> : null} */}
    </>
  );
}
