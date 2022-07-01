export async function getFilesRecursively(currentPath: string, base?: string) {
  const root = base ? new URL(currentPath, base).pathname : currentPath;
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(root)) {
    const entryPath = `${root}/${dirEntry.name}`;

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)).sort());
    } else {
      names.push(entryPath);
    }
  }

  return names;
}
