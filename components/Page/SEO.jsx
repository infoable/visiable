import React from "react";
import Head from "next/head";

function SEO({ title }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title ? title + " - Visiable" : "Visiable"}</title>
    </Head>
  );
}

export default SEO;
