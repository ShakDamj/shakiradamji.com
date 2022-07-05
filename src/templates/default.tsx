import React from 'react';
import { Translatable, Lang } from '../generate/mod.ts';
import { AmqDocument } from './AmqDocument.tsx';

export function meta(data: unknown, file: string) {
  return {};
}

export default ({ content }: { content: Translatable }) => (
  <AmqDocument title="potato">
    <Lang tr={content} />
  </AmqDocument>
);
