import { join } from 'https://deno.land/std/path/mod.ts';

const cwd = Deno.cwd();

export const relative = (route: string) => join(cwd, route);

export async function readConfig() {
  const text = await Deno.readTextFile('./config.json');
  return JSON.parse(text);
}
