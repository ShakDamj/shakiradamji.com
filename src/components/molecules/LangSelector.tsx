import React from 'react';
import { usePageUtils, useLang } from '../../generate/mod.ts';

export interface LangSelectorProps {
  className?: string;
}

export function LangSelector({ className }: LangSelectorProps) {
  const { Link, path } = usePageUtils();
  const lang = useLang();

  return (
    <>
      {lang !== 'en' ? (
        <Link className={className} href={`/${path}`}>
          🇬🇧
        </Link>
      ) : null}
      {lang !== 'es' ? (
        <Link className={className} href={`/es/${path}`}>
          🇪🇸
        </Link>
      ) : null}
      {/* {lang !== 'cat' ? (
        <Link className={className} href={`/cat/${path}`}>
          CAT
        </Link>
      ) : null} */}
    </>
  );
}
