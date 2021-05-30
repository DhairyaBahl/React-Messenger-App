import Document, { Head, Html, Main, NextScript } from 'next/document';

class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <script src="./colorTheme.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
