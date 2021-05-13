import Document, { Head, Html, Main, NextScript } from 'next/document';

import { RuntimeScripts, RuntimeStyles } from '../src/components/Runtime';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="display-en">
          <RuntimeStyles />
          <Main />
          <NextScript />
          <RuntimeScripts />
        </body>
      </Html>
    );
  }
}
