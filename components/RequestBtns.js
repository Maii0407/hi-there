import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { 
  Flex,
  Button
} from '@chakra-ui/react';

export const BtnOnFriends = ({ stranger }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleUnfriend = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/unfriend',
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
        onClick={ () => handleUnfriend() }
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

export const BtnOnRequest = ({ stranger }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCancelReq = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/cancelrequest',
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
        onClick={ () => handleCancelReq() }
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


export const BtnOnReceived = ({ stranger }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleAcceptReq = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/acceptrequest',
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

  const handleRejectReq = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/rejectrequest',
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

  return (
    <Flex
      direction='row'
      justifyContent='space-around'
      margin='5px 10px'
    >
      <Button
        onClick={ () => handleAcceptReq() }
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
        onClick={ () => handleRejectReq() }
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
