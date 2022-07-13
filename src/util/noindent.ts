export function noindent(parts: TemplateStringsArray, ...substs: unknown[]) {
  const match = parts[0].match(/^\n?(\s*)/);
  const indent = match ? match[1] : '';

  if (!indent) {
    return String.raw(parts, ...substs);
  }

  const indentAsRegex = new RegExp(`^${indent}`, 'gm');

  const fixed = Object.assign(
    parts.map((part) => part.replace(indentAsRegex, '')),
    { raw: parts.raw.map((part) => part.replace(indentAsRegex, '')) }
  );

  return String.raw(fixed, ...substs);
}
