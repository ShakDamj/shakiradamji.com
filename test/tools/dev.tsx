import { Scheduler } from './Scheduler.ts';
import { readConfig, relative } from './util.ts';

const config = await readConfig();
const ignore = [config.output].map(relative);
const scheduler = new Scheduler(50, recompile);

for await (const event of Deno.watchFs('.')) {
  const paths = event.paths.filter(path => !ignore.some(x => path.startsWith(x)));

  // console.log(event);

  if (paths.length) {
    console.log(`${paths[0]} changed, recompiling...`);
    scheduler.restart();
  }
}

async function recompile() {
  console.log('Running...');
  await Deno.run({ cmd: ['make', 'build'] });
  console.log('Ready.');
}
