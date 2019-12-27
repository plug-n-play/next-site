import '../lib/polyfill';
import React from 'react';
import App from 'next/app';
import NProgress from '../components/nprogress';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Component {...pageProps} />
        <NProgress />
      </>
    );
  }
}
