import React from 'react';
import {
  Flex,
  Text,
  Button,
  Avatar
} from '@chakra-ui/react';

export const CommentCard = ({ commentData }) => {
  return (
    <Flex
      direction='column'
      borderRadius='10px'
      padding='10px 15px'
      margin='5px 10px'
      backgroundColor='gray.900'
    >

      <Flex
        direction='row'
      >
        <Avatar
          src={ commentData.user.image }
          alt={ commentData.user.name }
          size='md'
        />
        <Button
          onClick={ () => console.log( commentData.user.name ) }//TODO this directs to profile page
          marginLeft='5px'
          size='sm'
          backgroundColor='transparent'
        >
          { commentData.user.name }
        </Button>
      </Flex>

      <Flex
        direction='column'
        padding='10px'
      >
        <Text>
          { commentData.content }
        </Text>
      </Flex>

      <Flex
        direction='row'
        justifyContent='space-between'
      >
        <Button
          onClick={ () => console.log( 'comment like' ) }
          backgroundColor='transparent'
          size='sm'
          borderWidth='1px'
          borderColor='red.500'
        >
          num.likes
        </Button>
        <Button
          onClick={ () => console.log( 'comment like' ) }
          backgroundColor='transparent'
          size='sm'
          borderWidth='1px'
          borderColor='red.500'
        >
          Like
        </Button>
      </Flex>

    </Flex>
  );
};