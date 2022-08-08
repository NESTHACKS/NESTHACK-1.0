import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

/**
 * This is a document class that contains meta links for our application
 * @return {void}
 */
class MyDocument extends Document {
  /**
   *
   * @return {jsx}
   */
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;400&display=swap" rel="stylesheet" />
        </Head>
        <body className="box-border text-[#222] bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
