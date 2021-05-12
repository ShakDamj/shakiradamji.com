import '../styles.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.runtime }} />
    </>
  );
}
