import { Scheduler } from './Scheduler.ts';
import { readConfig, relative } from './util.ts';

const config = await readConfig();
const scheduler = new Scheduler(50, recompile);

const ignore = [config.output, 'tools'].map(relative);

for await (const event of Deno.watchFs('.')) {
  const paths = event.paths.filter(path => !ignore.some(x => path.startsWith(x)));

  if (paths.length) {
    console.log(`${paths[0]} changed, scheduling...`);
    scheduler.restart();
  }
}

async function recompile() {
  console.log('Running...');
  await Deno.run({ cmd: ['make', 'build'] });
  console.log('Ready.');
}
