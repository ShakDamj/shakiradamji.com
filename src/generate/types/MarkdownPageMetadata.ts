import { Translatable } from '../components/Lang.tsx';
import { PageMetadata } from './PageMetadata.ts';

export interface MarkdownPageMetadata extends PageMetadata {
  labels?: Translatable[];
  content: Translatable;
  extract: Translatable;
  rest: Translatable;
}
