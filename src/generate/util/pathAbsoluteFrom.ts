export function pathAbsoluteFrom(url: string, base?: string | URL) {
  const root = new URL(url, base);
  return (path = '.') => new URL(path, root).pathname;
}
