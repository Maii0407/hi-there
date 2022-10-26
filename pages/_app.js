import { SessionProvider } from 'next-auth/react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Layout } from '../components/Layout';

import '../styles/globals.css';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#171923'
      }
    }
  }
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return(
    <SessionProvider session={ session }>
      <ChakraProvider theme={ theme }>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  ); 
}

export default MyApp
