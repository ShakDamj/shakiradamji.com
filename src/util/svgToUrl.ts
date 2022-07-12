export function svgToUrl(svg: string) {
  const escaped = svg
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/"/g, "'")
    .replace(/(\s|\n)+/g, ' ')
    .replace(/#/g, '%23');

  return `url("data:image/svg+xml;utf8,${escaped}")`;
}
