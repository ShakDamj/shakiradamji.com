import '../src/styles.css';

import { Runtime } from '../src/components/Runtime';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Runtime
        js={
          /*js*/ `
            const $ = selector => document.querySelector(selector);
            const $$ = selector => Array.from(document.querySelectorAll(selector));
          `
        }
      />
      <Component {...pageProps} />
      {/* <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.runtime }} /> */}
    </>
  );
}
