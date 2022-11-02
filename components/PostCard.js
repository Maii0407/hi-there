import React from 'react';

import {
  Avatar,
  Flex,
  Text,
  Image,
  Button
} from '@chakra-ui/react';

//TODO callback url for each username button directing to stranger profile
export const PostCard = ({ postData }) => {
  return (
    <Flex
      direction={ 'column' }
      margin={ '10px 0' }
      backgroundColor={ 'gray.900' }
    >
      <Flex
        direction={ 'row' }
        padding={ '10px' }
        borderBottom={ '1px solid' }
        borderColor={ 'red.500' }
      >
        <Avatar
          src={ postData.user.image }
        />
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
          onClick={ () => console.log( postData.user.name ) }
        >
          { postData.user.name }
        </Button>
      </Flex>

      <Flex
        direction={ 'column' }
      >
        <Text
          padding={ '5px 10px' }
        >
          { postData.content }
        </Text>
        {
          postData.image ? (
            <Image
              src={ postData.image }
              alt='post image content'
            />
          ) : null
        }
      </Flex>

      <Flex
        direction={ 'row' }
        justifyContent={ 'space-between' }
        padding={ '10px 10px' }
        borderBottom={ '1px' }
        borderColor={ 'red.500' }
      >
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
          borderWidth={ '1px' }
          borderColor={ 'red.500' }
          onClick={ () => console.log( postData ) }
        >
          Likes Num
        </Button>
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
          borderWidth={ '1px' }
          borderColor={ 'red.500' }
          onClick={ () => console.log( postData ) }
        >
          Comments Num
        </Button>
      </Flex>

      <Flex
        direction={ 'row' }
        justifyContent={ 'space-between' }
        padding={ '10px 10px' }
      >
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
          borderWidth={ '1px' }
          borderColor={ 'red.500' }
          onClick={ () => console.log( postData ) }
        >
          Like
        </Button>
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
          borderWidth={ '1px' }
          borderColor={ 'red.500' }
          onClick={ () => console.log( postData ) }
        >
          Comment
        </Button>
      </Flex>
    </Flex>
  );
};