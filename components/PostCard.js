import React, { useState } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

import { CommentOverlay } from './CommentOverlay';

import {
  Avatar,
  Flex,
  Text,
  Image,
  Button
} from '@chakra-ui/react';

export const PostCard = ({ postData, commentArray }) => {
  const { data: session } = useSession();
  
  const [ commentOpen, setCommentOpen ] = useState( false );

  // this function returns a different link if pressing current users name in posts???
  const returnLink = () => {
    if( session.user.id === postData.user._id ) {
      return '/profile';
    }
    else {
      return `/profile/${ postData.user._id }`;
    }
  };

  return (
    <Flex
      direction={ 'column' }
      margin={ '10px 0' }
      backgroundColor={ 'gray.900' }
      borderWidth={ '1px' }
      borderColor={ 'red.500' }
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
        <NextLink
          href={ returnLink() }
          passHref
        >
          <Button
            as='a'
            size={ 'sm' }
            backgroundColor={ 'transparent' }
          >
            { postData.user.name }
          </Button>
        </NextLink>
      </Flex>

      <Flex
        direction={ 'column' }
      >
        <Text
          padding={ '10px' }
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
          onClick={ () => setCommentOpen( true ) }
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
          onClick={ () => setCommentOpen( true ) }
        >
          Comment
        </Button>
      </Flex>
      { commentOpen ? ( <CommentOverlay setIsOpen={ setCommentOpen } postData={ postData } commentArray={ commentArray } /> ) : null }
    </Flex>
  );
};