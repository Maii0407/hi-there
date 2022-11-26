import React from 'react';
import { useSession } from 'next-auth/react';

import { Navbar } from './navbar/Navbar';

import { Box, Flex } from '@chakra-ui/react';

export const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
    >
      <Navbar />
      <Box
        marginLeft={ session ? { lg: '20%' } : {} }
      >
        { children }
      </Box>
    </Flex>
  );
};