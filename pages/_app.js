import '../css/tailwind.css';
import '../css/spinner.css';
import React from 'react';
import {DefaultSeo} from 'next-seo'
import SEO from '../next-seo.config'

import AuthContextProvider from './../src/context/AuthContext';

function MyApp({Component, pageProps}) {
  return (
      <AuthContextProvider {...pageProps}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthContextProvider>
  )
}

export default MyApp;
