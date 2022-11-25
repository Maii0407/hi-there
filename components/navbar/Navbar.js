import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { MobileNav } from './MobileNav';
import { PostForm } from './PostForm';

import {
  Box,
} from '@chakra-ui/react';

export const Navbar = () => {
  const [ formOpen, setFormOpen ] = useState( false );

  const { data: session } = useSession();
  
  if( session ) {
    return (
      <Box
        p='0 10px'
        borderBottom='5px'
        borderColor='red.500'
        borderStyle='double'
        backgroundColor='gray.900'
        position='sticky'
        top='0'
        zIndex='5'
      >
        <MobileNav />

        {
          formOpen ? (
            <PostForm setFormOpen={ setFormOpen } />
          ) : null
        }
      </Box>
    )
  };
};