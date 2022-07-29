import { Path } from '../types/Path.ts';

export function isTsx({ extension }: Path) {
  return extension === '.ts' || extension === '.tsx';
}
