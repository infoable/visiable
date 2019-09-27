import React from "react";
import App from "next/app";
import { CookiesProvider } from "react-cookie";
export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    );
  }
}
