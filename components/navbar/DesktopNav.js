import React from 'react';
import NextLink from 'next/link';

import { links } from '../data/pageLinkData';

import { 
  Box, 
  Stack,
  Link,
  Heading,
  Button
 } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const DesktopNav = ({ setFormOpen }) => {
  return (
    <Box
      display={{ base: 'none', lg: 'flex' }}
      flexDirection='column'
    >
      <Heading
        color='gray.900'
        backgroundColor='red.500'
        padding='5px'
        marginTop='5px'
        border={ '5px double' }
        borderColor='gray.900'
        borderRadius='5px'
        textAlign='center'
      >
        hiTHERE
      </Heading>

      <Box
        marginTop='20px'
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
                  color='red.500'
                >
                  { link.name }
                </Link>
              </NextLink>
            })
          }
          <Button
            onClick={ () => setFormOpen( true ) }
            leftIcon={ <AddIcon /> }
            color='gray.900'
            backgroundColor='red.500'
            borderRadius='10px'
            _hover
          >
            Post
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};