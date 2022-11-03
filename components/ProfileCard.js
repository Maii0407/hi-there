import React from 'react';
import { useSession } from 'next-auth/react';

import {
  Box,
  Flex,
  Button,
  Text,
  Avatar
} from '@chakra-ui/react';

export const ProfileCard = ({ userData, postLength }) => {
  const { data: session } = useSession();

  //this function returns differen button based on if stranger profile or own profile
  const returnDiffBtn = () => {
    if( session.user.id === userData._id ) {
      return <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        margin={ '5px 10px' }
      >
        Edit Profile
      </Button>
    }
    else {
      return <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        margin={ '5px 10px' }
      >
        Send Request
      </Button>
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
          src={ userData.image }
          alt={ userData.name }
          size={ 'xl' }
          borderWidth={ '5px' }
          borderColor={ 'red.500' }
          borderStyle={ 'double' }
        />
        <Flex
          direction={ 'column' }
        >
          <Text
            fontSize={ 'xl' }
          >
            { userData.name }
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={ 'column' }
      >
        <Text>{ userData.profileBio }</Text>
        <Text>{ userData.gender }</Text>
      </Flex>

      { returnDiffBtn() }

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
          { userData.friends.length } Friends
        </Button>
      </Flex>
    </Flex>
  );
};