export function pathRelativeTo(url: string, base?: string | URL) {
  const root = new URL(url, base);
  return (path = '.') => `./${path.replace(root.pathname, '')}`;
}
