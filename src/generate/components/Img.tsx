import { relative } from 'std/path/mod.ts';
import React from 'react';
import { usePageUtils } from './PageUtils.tsx';
import { tr, Translatable, useLang } from './Lang.tsx';

let imgRoot = '/img';

export function setImgRoot(root: string) {
  imgRoot = root;
}

export interface ImgProps {
  className?: string;
  src: Translatable;
  alt: Translatable;
}

export function Img({ className, src, alt }: ImgProps) {
  const { path, root } = usePageUtils();
  const lang = useLang();

  const siteRoot = root.join(path);
  const localeSrc = tr(src, lang);

  return (
    <img
      className={className}
      src={relative(`${siteRoot}`, `${imgRoot}/${localeSrc}`)}
      alt={tr(alt, lang)}
    />
  );
}
