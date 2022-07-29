import { Path } from '../types/Path.ts';

export async function getFilesRecursively(path: Path) {
  const names: Path[] = [];
  const dir = path.asDirectory();

  for await (const dirEntry of Deno.readDir(`${path}`)) {
    const entryPath = dir.resolve(dirEntry.name);

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)).sort());
    } else {
      names.push(entryPath);
    }
  }

  return names;
}
