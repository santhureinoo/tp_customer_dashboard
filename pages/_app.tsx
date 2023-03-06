import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from 'next/script';
import client from "../common/apollo-client";
import { ApolloProvider } from '@apollo/client';

config.autoAddCss = false
function MyApp({ Component, pageProps, router }: AppProps) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider >



}

export default MyApp
