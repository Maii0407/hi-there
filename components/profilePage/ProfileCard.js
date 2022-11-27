import React from 'react';

import {
  Flex,
  Button,
  Text,
  Avatar,
  Heading
} from '@chakra-ui/react';

export const ProfileCard = ({ userData, postLength, setIsOpen }) => {
  return (
    <Flex
      direction='column'
      borderRight={{ lg: '1px solid' }}
      borderLeft={{ lg: '1px solid' }}
      borderColor='red.500'
    >

      <Flex
        direction='row'
        justifyContent='space-between'
        alignItems='end'
        padding='10px'
      >
        <Avatar
          src={ userData.image }
          alt={ userData.name }
          size='xl'
          borderWidth='5px'
          borderColor='red.500'
          borderStyle='double'
        />
        <Button
          size={{ base: 'sm', lg: 'md' }}
          backgroundColor='red.500'
          color='gray.900'
          borderWidth='5px'
          borderStyle='double'
          borderColor='gray.900'
          onClick={ () => setIsOpen( true ) }
          _hover
        >
          Edit Profile
        </Button>
      </Flex>

      <Flex
        direction='column'
        padding='10px'
      >
        <Text
          fontSize='lg'
        >
          { userData.name }
        </Text>
        <Text
          fontSize='sm'
        >
          { userData.gender }
        </Text>
        <Text
          fontSize='sm'
        >
          { userData.profileBio }
        </Text>
      </Flex>

      <Flex
        direction='row'
        justifyContent={{ base: 'space-around', lg: 'flex-start' }}
        backgroundColor={{ base: 'gray.900', lg: 'transparent' }}
        padding='10px'
        size='sm'
        marginTop='10px'
        borderWidth={{ base: '1px 0 1px 0', lg: '0' }}
        borderColor='red.500'
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
          { userData.friends.length } Friends
        </Button>
      </Flex>

    </Flex>
  );
};