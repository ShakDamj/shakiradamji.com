import { Path } from '../types/Path.ts';

export function isMarkdown({ extension }: Path) {
  return extension === '.md';
}
