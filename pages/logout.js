import { signOut } from 'next-auth/react';
import NextLink from 'next/link';

import {
  Flex,
  Button,
  Heading
} from "@chakra-ui/react";

export default function Logout() {

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
          onClick={ () => signOut({ callbackUrl: '/' }) }
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
};