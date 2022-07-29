import { pagesDir, targetDir } from '../paths.ts';
import { Path } from './Path.ts';
import { SitePath } from './SitePath.ts';

/** Represents the path to a page's source in disk */
export class SitePage extends Path {
  static from(path: Path) {
    return new SitePage(path);
  }

  private constructor(path: Path) {
    super(path.toString());
  }

  resolve(path: string) {
    return new SitePage(super.resolve(path));
  }

  getDestinationOnDisk(root: Path) {
    const { extension, basename } = this;
    const isIndex = basename.replace(extension, '') === 'index';
    const newExtension = isIndex ? '.html' : '/index.html';
    const finalDir = targetDir.join(root);

    return this.removeDate()
      .chageParent(pagesDir, finalDir.asDirectory())
      .replace(extension, newExtension);
  }

  getPublishedPath(root = new Path('/')) {
    return this.removeDate()
      .chageParent(pagesDir, root.asDirectory())
      .replace(this.extension, '')
      .replace(/\/index$/, '') as SitePath;
  }

  removeDate() {
    return new Path(this.toString().replace(/\d{4}-\d{2}-\d{2}/, ''));
  }
}
