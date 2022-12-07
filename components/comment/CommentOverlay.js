import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { CommentCard } from './CommentCard';

import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
} from '@chakra-ui/react';

export const CommentOverlay = ({ setIsOpen, postData, commentArray, likeState, setLikeState }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handlePostLike = async () => {
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
      setLikeState( likeState => [ ...likeState, session.user.id ] );
    }
  };

  const handlePostUnlike = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/post/unlike',
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
      const filteredArray = likeState.filter( user => user !== session.user.id );
      setLikeState( filteredArray );
    }
  };

  //function that check if button is like or unlike
  const returnPostLikeBtn = () => {
    const found = likeState.find( user => user === session.user.id );

    if( !found ) {
      return <Button
        size={ 'sm' }
        backgroundColor={ 'transparent' }
        borderWidth={ '1px' }
        borderColor={ 'red.500' }
        onClick={ () => handlePostLike() }
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
        onClick={ () => handlePostUnlike() }
      >
        Unlike
      </Button>
    }
  };

  return(
    <Box
      position={ 'fixed' }
      height={ '100%' }
      width={ '100%' }
      backgroundColor={ 'gray.800' }
      zIndex={ '6' }
      top={ '0' }
      right={ '0' }
    >

      <Flex
        direction='row'
        justifyContent='space-around'
        alignItems='center'
        borderBottom={ '1px' }
        borderColor={ 'red.500' }
      >
        <IconButton
          icon={ <CloseIcon/> }
          backgroundColor={ 'transparent' }
          color={ 'red.500' }
          onClick={ () => setIsOpen( false ) }
        />
        <Button
          onClick={ () => console.log( 'num of likes' ) }
          backgroundColor='transparent'
        >
          { likeState.length } Likes
        </Button>
        { returnPostLikeBtn() }
      </Flex>

      <Flex
        direction='column'
        overflowY='scroll'
        maxHeight='90vh'
      >
        {
          commentArray.map(( comment ) => {
            return <CommentCard key={ comment._id } commentData={ comment } />
          })
        }
      </Flex>

    </Box>
  );
};