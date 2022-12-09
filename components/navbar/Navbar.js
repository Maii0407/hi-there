import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { MobileNav } from './MobileNav';
import { PostForm } from './PostForm';
import { DesktopNav } from './DesktopNav';

import {
  Box,
} from '@chakra-ui/react';

export const Navbar = () => {
  const [ formOpen, setFormOpen ] = useState( false );

  const { data: session } = useSession();
  
  if( session ) {
    return (
      <Box
        width={{ lg: '20%' }}
        height={{ lg: '100%' }}
        padding='0 10px'
        borderBottom={{ base: '5px', lg: 'none' }}
        borderColor='#E53E3E'
        borderStyle='double'
        backgroundColor='#171923'
        position={{ base: 'sticky', lg: 'fixed' }}
        top='0'
        left={{ lg: '0' }}
        zIndex='5'
      >
        <MobileNav setFormOpen={ setFormOpen } />
        <DesktopNav setFormOpen={ setFormOpen } />

        {
          formOpen ? (
            <PostForm setFormOpen={ setFormOpen } />
          ) : null
        }
      </Box>
    )
  };
};