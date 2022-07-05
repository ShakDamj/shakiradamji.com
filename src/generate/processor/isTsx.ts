import { extname } from 'std/path/mod.ts';

export function isTsx(file: string) {
  const extension = extname(file);
  return extension === '.ts' || extension === '.tsx';
}
