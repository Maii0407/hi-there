import React from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

import {
  Box,
  Flex,
  useDisclosure,
  IconButton,
  Text,
  Avatar,
  Link,
  Stack
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const links = [
    {
      name: 'Home',
      href: ''
    },
    {
      name: 'Profile',
      href: 'profile'
    },
    {
      name: 'Discover',
      href: 'discover'
    },
    {
      name: 'Menu',
      href: 'menu'
    },
    {
      name: 'Friend List',
      href: 'friendlist'
    },
    {
      name: 'Requests Received',
      href: 'requests'
    },
    {
      name: 'Logout',
      href: 'logout'
    }
  ]
  
  if( session ) {
    return (
      <Box
        p={ '0 10px' }
        borderBottom={ '5px' }
        borderColor={ 'red.500' }
        borderStyle={ 'double' }
      >
        <Flex
          h={ 16 }
          alignItems={ 'center' }
          justifyContent={ 'space-between' }
        >
          <IconButton
            size={ 'md' }
            icon={ isOpen ? <CloseIcon color={ 'red.500' }/> : <HamburgerIcon color={ 'red.500' }/> }
            onClick={ isOpen ? onClose : onOpen }
            backgroundColor={ 'transparent' }
          />
          <Text
            fontSize={ 'md' }
            color={ 'red.500' }
          >
            hiTHERE
          </Text>
          <Avatar
            size={ 'sm' }
            name={ session.user.name }
            src={ session.user.image }
          />
        </Flex>

        {
          isOpen ? (
            <Box
              pb={ 4 }
            >
              <Stack
                as={ 'nav' }
                spacing={ 4 }
              >
                {
                  links.map(( link ) => {
                    return <NextLink
                      href={ `/${ link.href }` }
                      passHref
                      key={ link.name }
                    >
                      <Link
                        color={ 'red.500' }
                        onClick={ isOpen ? onClose : onOpen }
                      >
                        { link.name }
                      </Link>
                    </NextLink>
                  })
                }
              </Stack>
            </Box>
          ) : null
        }
      </Box>
    )
  };

  return;
};