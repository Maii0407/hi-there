import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
  Flex,
  Button,
  Heading
} from "@chakra-ui/react";

//TODO edit auth routeing
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
  },[]);

  if( session ) {
    return(
      <Flex
        direction={ 'column' }
        color={ 'red.500' }
      >
        <Heading
          textAlign={ 'center' }
          padding={ '20px 10px' }
        >
          Logout?
        </Heading>
  
        <Flex
          direction={ 'row' }
          justifyContent={ 'space-around' }
          alignItems={ 'center' }
        >
          <Button
            onClick={ () => signOut({ callbackUrl: '/login' }) }
            color={ 'gray.900' }
            backgroundColor={ 'red.500' }
            borderWidth={ '5px' }
            borderColor={ 'gray.900' }
            borderStyle={ 'double' }
            size={ 'lg' }
          >
            Yes
          </Button>
          <NextLink
            href={ '/' }
            passHref
          >
            <Button
              as='a'
              color={ 'gray.900' }
              backgroundColor={ 'red.500' }
              borderWidth={ '5px' }
              borderColor={ 'gray.900' }
              borderStyle={ 'double' }
              size={ 'lg' }
            >
              No
            </Button>
          </NextLink>
        </Flex>
  
      </Flex>
    )
  }
};