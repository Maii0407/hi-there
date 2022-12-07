import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import {
  Flex,
  Text,
  Button,
  Avatar
} from '@chakra-ui/react';

export const CommentCard = ({ commentData }) => {
  const { data: session } = useSession();
  const [ likeState, setLikeState ] = useState( commentData.likes );

  //function that likes comment
  const handleLike = async () => {
    if( !commentData._id ) {
      console.log('liking this lol');
      setLikeState( likeState => [ ...likeState, session.user.id ] );
    }
    else {
      try {
        const response = await axios({
          method: 'put',
          url: '/api/comment/like',
          withCredentials: true,
          data: {
            commentId: commentData._id,
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
    }
  };

  //function to unlike comment
  const handleUnlike = async () => {
    if( !commentData._id ) {
      console.log('unliking this lol');
      const filteredArray = likeState.filter( user => user !== session.user.id );
      setLikeState( filteredArray );
    }
    else {
      try {
        const response = await axios({
          method: 'put',
          url: '/api/comment/unlike',
          withCredentials: true,
          data: {
            postId: commentData._id,
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
    }
  };

  //function that check if button is like or unlike
  const returnLikeBtn = () => {
    const found = likeState.find( user => user === session.user.id );

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
        onClick={ () => handleUnlike() }
      >
        Unlike
      </Button>
    }
  };

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
          { likeState.length } Likes
        </Button>
        { returnLikeBtn() }
      </Flex>

    </Flex>
  );
};