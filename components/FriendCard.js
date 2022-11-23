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
  IconButton
 } from '@chakra-ui/react';

 import { HamburgerIcon } from '@chakra-ui/icons';

//TODO finish this
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
      router.replace( router.asPath );
    }
  };

  return(
    <Flex
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      borderWidth='1px'
      borderColor='red.500'
      borderRadius='5px'
      padding='5px 10px'
      margin='5px'
    >

      <Flex
        direction='row'
        alignItems='center'
      >
        <Avatar
          src={ friendData.image }
          alt={ friendData.name }
          marginRight='10px'
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
      </Flex>

      <IconButton
        color='red.500'
        variant='ghost'
        aria-label='Options Btn'
        icon={ <HamburgerIcon /> }
      />
    </Flex>
  );
};