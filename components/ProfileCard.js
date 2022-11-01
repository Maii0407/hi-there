import React from 'react';

import {
  Box,
  Flex,
  Button,
  Text,
  Avatar
} from '@chakra-ui/react';

export const ProfileCard = ({ userData }) => {
  return (
    <Box>
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
          <Button
            backgroundColor={ 'red.500' }
            color={ 'gray.900' }
            borderWidth={ '5px' }
            borderStyle={ 'double' }
            borderColor={ 'gray.900' }
          >
            Edit Profile
          </Button>
        </Flex>
      </Flex>

      <Flex
        direction={ 'column' }
      >
        <Text>{ userData.profileBio }</Text>
        <Text>{ userData.gender }</Text>
      </Flex>

      <Flex
        direction={ 'row' }
        justifyContent={ 'space-around' }
        backgroundColor={ 'gray.900' }
        padding={ '10px' }size={ 'sm' }
        backgroundColor={ 'transparent' }
        marginTop={ '10px' }
        borderWidth={ '1px 0 1px 0' }
        borderColor={ 'red.500' }
      >
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
        >
          Num Posts
        </Button>
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
        >
          Num Friends
        </Button>
      </Flex>
    </Box>
  );
};