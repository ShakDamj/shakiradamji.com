import React from 'react';
import { usePageUtils } from './PageUtils.tsx';
import { tr, Translatable, useLang } from './Lang.tsx';

let imgRoot = '/img';

export function setImgRoot(root: string) {
  imgRoot = root;
}

export function getImgRoot() {
  return imgRoot;
}

export interface ImgProps {
  className?: string;
  src: Translatable;
  alt?: Translatable;
}

export function Img({ className, src, alt }: ImgProps) {
  const { asset } = usePageUtils();
  const lang = useLang();
  const localeSrc = tr(src, lang);

  return (
    <img
      className={className}
      src={asset(`${imgRoot}/${localeSrc}`)}
      alt={alt && tr(alt, lang)}
    />
  );
}
