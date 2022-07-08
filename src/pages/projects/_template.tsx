import { RelatedLinksProps } from '../../components/molecules/RelatedLinks.tsx';
import {
  MarkdownPageMetadata,
  Translatable,
  YearMonthDay,
} from '../../generate/mod.ts';

export interface ProjectProps extends MarkdownPageMetadata {
  labels: Translatable[];
  links?: RelatedLinksProps['links'];
  from?: YearMonthDay;
  to?: YearMonthDay;
}

export { default } from '../../components/templates/AmqShowcase.tsx';
