import { basename, dirname, extname, relative } from 'std/path/mod.ts';

const str = (x: string | URL) => (typeof x === 'string' ? x : x.pathname);

export class Path {
  private readonly url: URL;

  get parent() {
    const parentDir = dirname(this.toString());
    return new Path(`${parentDir}/`);
  }

  get basename() {
    return basename(this.toString());
  }

  get extension() {
    return extname(this.toString());
  }

  get isDirectory() {
    return this.toString().endsWith('/');
  }

  constructor(path: string | URL, base?: string | URL) {
    this.url = base
      ? new URL(str(path), str(base))
      : new URL(str(path), 'file:///');
  }

  isParentOf(path: Path) {
    return `${path}`.startsWith(`${this}`);
  }

  isChildOf(path: Path) {
    return path.isParentOf(this);
  }

  asDirectory() {
    return this.isDirectory ? this : new Path(`${this}/`);
  }

  chageParent(from: Path, to: Path) {
    if (!this.isChildOf(from)) {
      throw new Error(`${from} is not a parent of ${this}`);
    }

    return this.replace(`${from}`, `${to}`);
  }

  relativeTo(path: Path) {
    return relative(`${path}`, `${this}`);
  }

  resolve(path: string) {
    return new Path(path, this.url.toString());
  }

  join(path: string | Path) {
    return new Path(`${this}/${path}`);
  }

  sibling(name: string) {
    return this.isDirectory ? this.parent.resolve(name) : this.resolve(name);
  }

  replace(from: string | RegExp, to: string) {
    return new Path(this.toString().replace(from, to));
  }

  startsWith(value: string | Path) {
    return this.toString().startsWith(`${value}`);
  }

  endsWith(value: string | Path) {
    return this.toString().endsWith(`${value}`);
  }

  toString() {
    return this.url.pathname.replace(/\/\/+/g, '/');
  }
}
