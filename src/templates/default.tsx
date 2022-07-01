import React from 'react';
import { Lang, Translatable } from '../atoms/Lang.tsx';
import { AmqDocument } from './AmqDocument.tsx';

export function meta(data: unknown, file: string) {
  return {};
}

export default ({ content }: { content: Translatable }) => (
  <AmqDocument title="potato">
    <Lang tr={content} />
  </AmqDocument>
);
