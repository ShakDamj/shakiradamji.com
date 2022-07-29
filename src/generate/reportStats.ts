import { SitePage } from './types/SitePage.ts';

export function reportStats(sources: SitePage[], perf: PagePerf[]) {
  const sum = (iterator: (x: PagePerf) => number) =>
    perf.reduce((acc: number, curr: PagePerf) => acc + iterator(curr), 0);

  const print = (x: number, unit = 'ms') =>
    `${x}${unit} (${Math.round(x / sources.length)}${unit}/page)`;

  const total = sum((x) => x.end - x.start);
  const size = sum((x) => x.size);
  const kb = print(Math.round(size / 1000), 'Kb');

  console.log(`Processed ${sources.length} pages of ${kb} in ${print(total)}`);
}

export interface PagePerf {
  start: number;
  generated: number;
  end: number;
  size: number;
}
