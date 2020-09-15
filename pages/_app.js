import '../css/tailwind.css';
import React from 'react';
import {DefaultSeo} from 'next-seo'
import SEO from '../next-seo.config'

import AuthContextProvider from './../src/context/AuthContext';
import FlashMessagesContextProvider from "../src/context/FlashMessagesContext";

function MyApp({Component, pageProps}) {
  return (
      <AuthContextProvider>
          <FlashMessagesContextProvider>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </FlashMessagesContextProvider>
      </AuthContextProvider>
  )
}

export default MyApp;
