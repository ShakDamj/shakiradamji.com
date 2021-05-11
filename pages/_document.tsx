import Document, { Head, Html, Main, NextScript } from 'next/document';

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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
