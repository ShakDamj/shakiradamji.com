import { Translatable } from '../components/Lang.tsx';
import { SitePage } from './SitePage.ts';
import { YearMonthDay } from './YearMonthDay.ts';

export interface PageMetadata {
  type: 'md' | 'tsx';
  file: SitePage;
  path: string;
  title: Translatable;
  date: YearMonthDay | null;
  pinned?: boolean;
}
