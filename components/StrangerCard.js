import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { BtnOnFriends, BtnOnRequest, BtnOnReceived, BtnOnAddFriend } from './RequestBtns';

import {
  Flex,
  Button,
  Text,
  Avatar
} from '@chakra-ui/react';

//TODO finish this
export const StrangerCard = ({ strangerData, userData, postLength }) => {
  const { data: session } = useSession();

  //TODO add the axios requests functions
  //TODO finish this
  const returnBtn = () => {
    const strangerIsFriend = userData.friends.find( friend => friend._id === strangerData._id );
    const strangerOnRequest = userData.requestsSent.find( stranger => stranger === strangerData._id );
    const strangerOnReceived = userData.requestsReceived.find( stranger => stranger._id === strangerData._id );

    if( strangerIsFriend ) {
      return <BtnOnFriends />;
    }
    if( strangerOnRequest ) {
      return <BtnOnRequest />;
    }
    if( strangerOnReceived ) {
      return <BtnOnReceived />;
    }
    if( !strangerIsFriend || !strangerOnRequest ) {
      return <BtnOnAddFriend />;
    }
  };

  return (
    <Flex
      direction={ 'column' }
      justifyContent={ 'center' }
    >
      <Flex
        direction={ 'row' }
        justifyContent={ 'space-around' }
        padding={ '10px' }
      >
        <Avatar
          src={ strangerData.image }
          alt={ strangerData.name }
          size={ 'xl' }
          borderWidth={ '5px' }
          borderColor={ 'red.500' }
          borderStyle={ 'double' }
        />
        <Flex
          direction={ 'column' }
        >
          <Text
            fontSize={ 'lg' }
            marginLeft='10px'
          >
            { strangerData.name }
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={ 'column' }
        padding='0 10px'
      >
        <Text
          fontSize='sm'
        >
          { strangerData.profileBio }
        </Text>
        <Text
          fontSize='sm'
        >
          { strangerData.gender }
        </Text>
      </Flex>

      { returnBtn() }

      <Flex
        direction={ 'row' }
        justifyContent={ 'space-around' }
        backgroundColor={ 'gray.900' }
        padding={ '10px' }size={ 'sm' }
        marginTop={ '10px' }
        borderWidth={ '1px 0 1px 0' }
        borderColor={ 'red.500' }
      >
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
        >
          { postLength.length } Posts
        </Button>
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
        >
          { strangerData.friends.length } Friends
        </Button>
      </Flex>
    </Flex>
  );
};