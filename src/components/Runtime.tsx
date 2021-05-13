const scripts = registry();
const styles = registry();

export interface RuntimeProps {
  css?: string;
  js?: string;
}

export function Runtime({ css, js }: RuntimeProps) {
  styles.touch(css);
  scripts.touch(js);
  return null;
}

export function RuntimeStyles() {
  const css = styles.dump();
  return <style id="runtime-styles" dangerouslySetInnerHTML={{ __html: css.join('\n') }} />;
}

export function RuntimeScripts() {
  const js = scripts.dump(x => x.replace(/  +/g, ' ').trim());
  return <script id="runtime-scripts" dangerouslySetInnerHTML={{ __html: js.join(';\n') }} />;
}

function registry() {
  const entries = new Set<string>();

  return {
    touch(value: string) {
      if (value != null) {
        entries.add(value);
      }
    },

    dump(iterator?: (x: string) => string) {
      const list = Array.from(entries);
      entries.clear();
      return iterator ? list.map(iterator) : list;
    },
  };
}
