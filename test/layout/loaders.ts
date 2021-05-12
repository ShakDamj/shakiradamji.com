import { dirname, join } from 'https://deno.land/std/path/mod.ts';

export function requireCss(root: string, path: string) {
  return Deno.readTextFile(join(dirname(root), path));
}

export function requireScript(root: string, path: string) {
  return Deno.readTextFile(join(dirname(root), path));
}
