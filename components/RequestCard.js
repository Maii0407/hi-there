import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';

import { 
  Flex,
  Button, 
  Avatar,
  Link
 } from '@chakra-ui/react';

export const RequestCard = ({ requestData }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const acceptReq = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/acceptrequest',
        withCredentials: true,
        data: {
          strangerId: requestData._id,
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

  const rejectReq = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/rejectrequest',
        withCredentials: true,
        data: {
          strangerId: requestData._id,
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
      margin='5px'
      padding='5px 10px'
      border='1px'
      borderColor='red.500'
      borderRadius='5px'
    >
      <Avatar
        src={ requestData.image }
        alt={ requestData.name }
        size='lg'
      />

      <Flex
        width='100%'
        direction='column'
      >

        <NextLink
          href={ `/profile/${ requestData._id }` }
          passHref
        >
          <Link
            color={ 'red.500' }
            fontSize='15px'
            textAlign='center'
          >
            { requestData.name }
          </Link>
        </NextLink>

        <Flex
          justifyContent='space-around'
          padding='5px'
        >
          <Button
            onClick={ () => acceptReq() }
            variant='solid'
            backgroundColor='red.500'
            size='sm'
          >
            Accept
          </Button>
          <Button
            onClick={ () => rejectReq() }
            variant='outline'
            borderColor='red.500'
            color='red.500'
            size='sm'
          >
            Reject
          </Button>
        </Flex>
        
      </Flex>
    </Flex>
  );
};