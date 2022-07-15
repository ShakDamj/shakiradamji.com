import { Translatable } from '../components/Lang.tsx';
import { PageMetadata } from './PageMetadata.ts';

export interface MarkdownPageMetadata extends PageMetadata {
  pinned?: boolean;
  labels?: Translatable[];
  content: Translatable;
}
