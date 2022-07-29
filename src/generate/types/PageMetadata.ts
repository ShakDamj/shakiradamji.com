import { Translatable } from '../components/Lang.tsx';
import { SitePage } from './SitePage.ts';
import { SitePath } from './SitePath.ts';
import { YearMonthDay } from './YearMonthDay.ts';

export interface PageMetadata {
  type: 'md' | 'tsx';
  id: string;
  file: SitePage;
  path: SitePath;
  title: Translatable;
  date: YearMonthDay | null;
  pinned?: boolean;
}
