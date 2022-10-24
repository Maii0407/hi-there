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

function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider theme={ theme }>
      <Component {...pageProps} />
    </ChakraProvider>
  ); 
}

export default MyApp
