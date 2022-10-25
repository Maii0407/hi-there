import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

import { Box, Button } from '@chakra-ui/react';

export const LoginBtn = () => {
  const { data: session } = useSession();
  console.log( 'session', session );

  if( session ) {
    return (
      <Box color='red'>
        <Button onClick={ () => signOut()} color='red'>Logout</Button>
      </Box>
    )
  }

  return (
    <Box color='red'>
      <Button onClick={ () => signIn()} color='red'>Login</Button>
    </Box>
  )
};