import React, { useState } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  console.log({ postData });
  
  const [ commentOpen, setCommentOpen ] = useState( false );

  // this function returns a different link if pressing current users name in posts???
  const returnLink = () => {
    if( session.user.id=== postData.user._id ) {
      return '/profile';
    }
    else {
      return `/profile/${ postData.user._id }`;
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/post/like',
        withCredentials: true,
        data: {
          postId: postData._id,
          userId: session.user.id
        },
      });
  
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      router.replace( router.asPath );
      // const event = new Event("visibilitychange");
      // document.dispatchEvent(event);
    }
  };

  //TODO finish this
  const handleUnlike = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/update',
        withCredentials: true,
        data: {
          name: nameState,
          gender: genderState,
          profileBio: bioState,
          image: imageState
        },
      });
  
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      setIsOpen( false );
      router.replace( router.asPath );
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
    }
  };

  //function that check if button is like or unlike
  const returnLikeBtn = () => {
    const found = postData.likes.find( user => user === session.user.id );

    if( !found ) {
      return <Button
        size={ 'sm' }
        backgroundColor={ 'transparent' }
        borderWidth={ '1px' }
        borderColor={ 'red.500' }
        onClick={ () => handleLike() }
      >
        Like
      </Button>
    }
    else {
      return <Button
        size={ 'sm' }
        backgroundColor={ 'transparent' }
        borderWidth={ '1px' }
        borderColor={ 'red.500' }
        onClick={ () => console.log( 'unlike' ) }
      >
        Unlike
      </Button>
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
          { postData.likes.length } Likes
        </Button>
        <Button
          size={ 'sm' }
          backgroundColor={ 'transparent' }
          borderWidth={ '1px' }
          borderColor={ 'red.500' }
          onClick={ () => setCommentOpen( true ) }
        >
          { commentArray.length } Comments
        </Button>
      </Flex>

      <Flex
        direction={ 'row' }
        justifyContent={ 'space-between' }
        padding={ '10px 10px' }
      >
        { returnLikeBtn() }
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