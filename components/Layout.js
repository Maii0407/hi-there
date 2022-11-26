import React from 'react';

import { Navbar } from './navbar/Navbar';

import { Box, Flex } from '@chakra-ui/react';

export const Layout = ({ children }) => {
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
    >
      <Navbar />
      <Box
        marginLeft={{ lg: '20%' }}
      >
        { children }
      </Box>
    </Flex>
  );
};