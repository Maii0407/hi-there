import React from 'react';
import { Navbar } from './Navbar';
import { Box } from '@chakra-ui/react';

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        marginTop={ '70px' }
      >
        { children }
      </Box>
    </>
  );
};