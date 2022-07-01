export function path(url: string, base?: string | URL) {
  const root = new URL(url, base);
  const fromRoot = (path = '.') => new URL(path, root).pathname;
  const relative = (path = '.') => `./${path.replace(root.pathname, '')}`;
  return { fromRoot, relative };
}
