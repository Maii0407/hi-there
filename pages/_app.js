import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Layout } from '../components/Layout';

import '../styles/globals.css';

const theme = extendTheme({
  fonts: {
    heading: `'Alfa Slab One', alfa-slab-one`,
    body: `'Alfa Slab One', alfa-slab-one`,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'rgb(26, 32, 44)'
      },
      button: {
        _hover: {
          filter: 'auto',
          brightness: '70%'
        }
      },
      a: {
        _hover: {
          filter: 'auto',
          brightness: '70%'
        }
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
          <Head>
            <title>hiTHERE</title>
            <meta name='description' content='hello world' />
            <meta name="referrer" content="no-referrer" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  ); 
}

export default MyApp
