import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { 
  Flex,
  Link,
  Button,
  Avatar,
  IconButton,
  Box,
 } from '@chakra-ui/react';

 import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const FriendCard = ({ friendData }) => {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [ openOptions, setOpenOptions ] = useState( false );

  const handleUnfriend = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/unfriend',
        withCredentials: true,
        data: {
          strangerId: friendData._id,
          userId: session.user.id
        },
      });
  
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      setOpenOptions( false );
      router.replace( router.asPath );
    }
  };

  return(
    <Flex
      direction='row'
      justifyContent={{ base: 'space-between', lg: 'center' }}
      alignItems='center'
      borderWidth='1px'
      borderColor='red.500'
      borderRadius='5px'
      padding='5px 10px'
      margin='5px'
    >

      <Flex
        direction={{ base: 'row', lg: 'column' }}
        justifyContent={{ lg: 'center' }}
        alignItems='center'
      >
        <Avatar
          src={ friendData.image }
          alt={ friendData.name }
          size={{ base: 'lg', lg: '2xl' }}
          marginRight={{ base: '10px' }}
        />

        <NextLink
          href={ `/profile/${ friendData._id }` }
          passHref
        >
          <Link
            color={ 'red.500' }
            fontSize='15px'
            textAlign='center'
            padding={{ lg: '10px 0 5px' }}
          >
            { friendData.name }
          </Link>
        </NextLink>

        <Button
          onClick={ () => handleUnfriend() }
          display={{ base: 'none', lg: 'block' }}
          color='gray.900'
          backgroundColor='red.500'
          _hover
        >
          Unfriend
        </Button>
      </Flex>

      <IconButton
        onClick={ () => setOpenOptions( true ) }
        display={{ lg: 'none' }}
        color='red.500'
        variant='ghost'
        aria-label='Options Btn'
        icon={ <HamburgerIcon /> }
      />

      {
        openOptions ? (
          <Box
            display={{ lg: 'none' }}
            position='fixed'
            height='100%'
            width='100%'
            backgroundColor='rgba(0, 0, 0, 0.5)'
            zIndex='5'
            top='0'
            right='0'
          >
            <Flex
              direction='column'
              position='fixed'
              width='100%'
              bottom='0'
              right='0'
              backgroundColor='black'
            >

              <Flex
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                padding='5px'
              >
                <Avatar
                  src={ friendData.image }
                  alt={ friendData.name }
                />
                <NextLink
                  href={ `/profile/${ friendData._id }` }
                  passHref
                >
                  <Link
                    color={ 'red.500' }
                    fontSize='15px'
                    textAlign='center'
                  >
                    { friendData.name }
                  </Link>
                </NextLink>
                <IconButton
                  onClick={ () => setOpenOptions( false ) }
                  color='red.500'
                  variant='ghost'
                  aria-label='Close Btn'
                  icon={ <CloseIcon /> }
                />
              </Flex>

              <Button
                onClick={ () => handleUnfriend() }
                backgroundColor='red.500'
                color='gray.900'
                margin='10px'
              >
                Unfriend
              </Button>
            </Flex>
          </Box>
        ) : null
      }
    </Flex>
  );
};