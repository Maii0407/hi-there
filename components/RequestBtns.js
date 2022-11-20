import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { 
  Flex,
  Button
} from '@chakra-ui/react';

//TODO finish this
export const BtnOnFriends = ({ stranger }) => {
  console.log({ userData });
  console.log({ strangerData });

  return (
    <Flex
      direction='row'
      justifyContent='space-around'
      margin='5px 10px'
    >
      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        padding='15px'
        size='sm'
      >
        Friends
      </Button>
      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        padding='15px'
        size='sm'
      >
        Unfriend
      </Button>
    </Flex>
  );
};

//TODO finish this
export const BtnOnRequest = ({ stranger }) => {
  return (
    <Flex
      direction='row'
      justifyContent='space-around'
      margin='5px 10px'
    >
      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        padding='15px'
        size='sm'
      >
        Requested
      </Button>
      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        padding='15px'
        size='sm'
      >
        Cancel Request
      </Button>
    </Flex>
  );
};

//TODO finish this
export const BtnOnReceived = ({ stranger }) => {
  return (
    <Flex
      direction='row'
      justifyContent='space-around'
      margin='5px 10px'
    >
      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        padding='15px'
        size='sm'
      >
        Accept Request
      </Button>
      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        padding='15px'
        size='sm'
      >
        Reject Request
      </Button>
    </Flex>
  );
};

export const BtnOnAddFriend = ({ stranger }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSendReq = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/sendrequest',
        withCredentials: true,
        data: {
          strangerId: stranger._id,
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
    <Button
      onClick={ () => handleSendReq() }
      backgroundColor={ 'red.500' }
      color={ 'gray.900' }
      borderWidth={ '5px' }
      borderStyle={ 'double' }
      borderColor={ 'gray.900' }
      margin='5px 10px'
    >
      Send Friend Request
    </Button>
  );
};
