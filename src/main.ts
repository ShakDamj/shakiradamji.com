import { generate } from './generate/mod.ts';

await generate({
  '': 'en',
  '/en': 'en',
  '/es': 'es',
});

console.log('Done');
