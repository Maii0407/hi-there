import React from 'react';

import { BtnOnFriends, BtnOnRequest, BtnOnReceived, BtnOnAddFriend } from './RequestBtns';

import {
  Flex,
  Button,
  Text,
  Avatar
} from '@chakra-ui/react';

export const StrangerCard = ({ strangerData, userData, postLength }) => {

  const returnBtn = () => {
    const strangerIsFriend = userData.friends.find( friend => friend === strangerData._id );
    const strangerOnRequest = userData.requestsSent.find( stranger => stranger === strangerData._id );
    const strangerOnReceived = userData.requestsReceived.find( stranger => stranger === strangerData._id );

    if( strangerIsFriend ) {
      return <BtnOnFriends stranger={ strangerData } />;
    }
    if( strangerOnRequest ) {
      return <BtnOnRequest stranger={ strangerData } />;
    }
    if( strangerOnReceived ) {
      return <BtnOnReceived stranger={ strangerData } />;
    }
    if( !strangerIsFriend || !strangerOnRequest ) {
      return <BtnOnAddFriend stranger={ strangerData } />;
    }
  };

  return (
    <Flex
      direction='column'
      borderRight={{ lg: '1px solid' }}
      borderLeft={{ lg: '1px solid' }}
      borderColor='rgb(229, 62, 62)'
    >

      <Flex
        direction='row'
        justifyContent='space-between'
        alignItems='end'
        padding='10px'
      >
        <Avatar
          src={ strangerData.image }
          alt={ strangerData.name }
          size='xl'
          borderWidth='5px'
          borderColor='rgb(229, 62, 62)'
          borderStyle='double'
        />
        { returnBtn() }
      </Flex>

      <Flex
        direction='column'
        padding='10px'
      >
        <Text
          fontSize='lg'
        >
          { strangerData.name }
        </Text>
        <Text
          fontSize='sm'
        >
          { strangerData.gender }
        </Text>
        <Text
          fontSize='sm'
        >
          { strangerData.profileBio }
        </Text>
      </Flex>

      <Flex
        direction='row'
        justifyContent={{ base: 'space-around', lg: 'flex-start' }}
        backgroundColor={{ base: 'rgb(23, 25, 35)', lg: 'transparent' }}
        padding='10px'
        size='sm'
        marginTop='10px'
        borderWidth={{ base: '1px 0 1px 0', lg: '0' }}
        borderColor='rgb(229, 62, 62)'
      >
        <Button
          size='sm'
          backgroundColor='transparent'
          _hover
        >
          { postLength.length } Posts
        </Button>
        <Button
          size='sm'
          backgroundColor='transparent'
          _hover
        >
          { strangerData.friends.length } Friends
        </Button>
      </Flex>

    </Flex>
  );
};