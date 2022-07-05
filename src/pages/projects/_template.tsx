import {
  MarkdownPageMetadata,
  Translatable,
  YearMonthDay,
} from '../../generate/mod.ts';

export interface ProjectProps extends MarkdownPageMetadata {
  labels: Translatable[];
  from?: YearMonthDay;
  to?: YearMonthDay;
}

export { default } from '../../components/templates/AmqShowcase.tsx';
