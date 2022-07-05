import { extname } from 'std/path/mod.ts';

export function isMarkdown(file: string) {
  const extension = extname(file);
  return extension === '.md';
}
