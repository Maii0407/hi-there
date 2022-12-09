import React, { useState } from 'react';
import NextLink from 'next/link';

import { links } from '../data/pageLinkData';

import { 
  Flex,
  Stack,
  Link,
  IconButton,
  Text,
  Box,
  Button
 } from '@chakra-ui/react';

 import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

export const MobileNav = ({ setFormOpen }) => {
  const [ mobileNavOpen, setMobileNavOpen ] = useState( false );

  const handleNav = () => {
    if( mobileNavOpen ) {
      setMobileNavOpen( false );
    }
    else if( !mobileNavOpen ) {
      setMobileNavOpen( true );
    }
  };
  

  return (
    <Flex
      direction='column'
      display={{ lg: 'none' }}
    >
      <Flex
        height='64px'
        alignItems='center'
        justifyContent='space-between'
      >
        <IconButton
          size='md'
          icon={ mobileNavOpen ? <CloseIcon color={ 'rgb(229, 62, 62)' }/> : <HamburgerIcon color={ 'rgb(229, 62, 62)' }/> }
          onClick={ () => handleNav() }
          backgroundColor='transparent'
        />
        <Text
          fontSize='md'
          color='rgb(229, 62, 62)'
        >
          hiTHERE
        </Text>
        <Button
          leftIcon={ <AddIcon/> }
          color='rgb(23, 25, 35)' 
          size='sm' 
          backgroundColor='rgb(229, 62, 62)'
          _hover
          onClick={ () => setFormOpen( true ) }
        >
          Post
        </Button>
      </Flex>

      {
        mobileNavOpen ? (
          <Box
            paddingBottom='15px'
          >
            <Stack
              as='nav'
              spacing='15px'
            >
              {
                links.map(( link ) => {
                  return <NextLink
                    href={ `/${ link.href }` }
                    passHref
                    key={ link.name }
                  >
                    <Link
                      color='rgb(229, 62, 62)'
                      onClick={ () => setMobileNavOpen( false ) }
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
    </Flex>
  );
};