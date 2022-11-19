import React from 'react';
import { useSession } from 'next-auth/react';

import {
  Flex,
  Button,
  Text,
  Avatar
} from '@chakra-ui/react';

//TODO finish this
export const ProfileCard = ({ userData, postLength, setIsOpen }) => {
  const { data: session } = useSession();

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
            fontSize={ 'lg' }
            marginLeft='10px'
          >
            { userData.name }
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
          { userData.profileBio }
        </Text>
        <Text
          fontSize='sm'
        >
          { userData.gender }
        </Text>
      </Flex>

      <Button
        backgroundColor={ 'red.500' }
        color={ 'gray.900' }
        borderWidth={ '5px' }
        borderStyle={ 'double' }
        borderColor={ 'gray.900' }
        margin={ '5px 10px' }
        onClick={ () => setIsOpen( true ) }
      >
        Edit Profile
      </Button>

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