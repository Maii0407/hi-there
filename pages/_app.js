import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '../styles/globals.css';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#000000'
      }
    }
  },
  colors: {
    black: '#000000',
    red: '#E53E3E'
  }
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return(
    <SessionProvider session={ session }>
      <ChakraProvider theme={ theme }>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  ); 
}

export default MyApp
