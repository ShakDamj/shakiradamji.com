export async function emptyDirectory(dir: string) {
  for await (const dirEntry of Deno.readDir(dir)) {
    const item = `${dir}/${dirEntry.name}`;

    try {
      await Deno.remove(item, { recursive: true });
      // deno-lint-ignore no-empty
    } catch {}
  }
}
