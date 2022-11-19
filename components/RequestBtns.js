import React from 'react';

import { 
  Flex,
  Button
} from '@chakra-ui/react';

export const BtnOnFriends = ({ btnFunc }) => {
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

export const BtnOnRequest = ({ btnFunc }) => {
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

export const BtnOnReceived = ({ btnFunc }) => {
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

export const BtnOnAddFriend = ({ btnFunc }) => {
  return(
    <Button
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
