import { cache, flush } from '@emotion/css';

export * from '@emotion/css';

export function flushCss() {
  const styles = Object.values(cache.inserted);
  flush();
  return styles.reverse();
}
