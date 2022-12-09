import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
  Flex,
  Button,
  Heading
} from "@chakra-ui/react";

export default function Logout() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if( session ) {
      router.replace( router.asPath );
    }
    else {
      router.replace( '/login' );
    }
  },[ session, router ]);

  if( session ) {
    return(
      <Flex
        width={{ lg: '30vw' }}
        direction='column'
        color='#E53E3E'
        margin={{ lg: '50px' }}
        padding={{ lg: '20px' }}
        border={{ lg: '5px double' }}
        borderColor={{ lg: '#E53E3E' }}
        borderRadius={{ lg: '5px' }}
      >
        <Heading
          textAlign='center'
          padding='20px 10px'
        >
          Logout?
        </Heading>
  
        <Flex
          direction='row'
          justifyContent='space-around'
          alignItems='center'
        >
          <Button
            onClick={ () => signOut({ callbackUrl: '/login' }) }
            color='#171923'
            backgroundColor='#E53E3E'
            borderWidth='5px'
            borderColor='#171923'
            borderStyle='double'
            size='lg'
            _hover
          >
            Yes
          </Button>
          <NextLink
            href={ '/' }
            passHref
          >
            <Button
              as='a'
              color='#171923'
              backgroundColor='#E53E3E'
              borderWidth='5px'
              borderColor='#171923'
              borderStyle='double'
              size='lg'
              _hover
            >
              No
            </Button>
          </NextLink>
        </Flex>
  
      </Flex>
    )
  }
};