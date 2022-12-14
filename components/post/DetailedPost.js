import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

import { 
  Flex,
  Avatar,
  Button,
  Text,
  Image,
  Input
 } from '@chakra-ui/react';

export const DetailedPost = ({ postData }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [ likeState, setLikeState ] = useState( postData.likes );
  const [ contentState, setContentState ] = useState('');

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
      setLikeState( likeState => [ ...likeState, session.user.id ] );
    }
  };

  const handleUnlike = async () => {
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
  const returnLikeBtn = () => {
    const found = likeState.find( user => user === session.user.id );

    if( !found ) {
      return <Button
        size='sm'
        backgroundColor='transparent'
        borderWidth='1px'
        borderColor='rgb(229, 62, 62)'
        onClick={ () => handleLike() }
        _hover
      >
        Like
      </Button>
    }
    else {
      return <Button
        size='sm'
        backgroundColor='transparent'
        borderWidth='1px'
        borderColor='rgb(229, 62, 62)'
        onClick={ () => handleUnlike() }
        _hover
      >
        Unlike
      </Button>
    }
  };

  //this function handles if form is submitted
  const handleCommentSend = async () => {
    if( contentState === '' || !contentState ) {
      console.log( 'comment content empty' );
    }
    else {
      try {
        const response = await axios({
          method: 'post',
          url: '/api/comment/create',
          withCredentials: true,
          data: {
            content: contentState,
            user: session.user.id,
            post: postData._id
          },
        });
    
        return response.data;
      }
      catch( error ) {
        console.log( error );
      }
      finally {
        setContentState('');
        router.replace( router.asPath );
      }
    }
  };

  return (
    <Flex
      direction='column'
      backgroundColor='rgb(23, 25, 35)'
      borderWidth='1px'
      borderColor='rgb(229, 62, 62)'
      marginTop='20px'
      borderRadius={{ lg: '10px' }}
    >
      <Flex
        direction='row'
        padding='10px'
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
            size='sm'
            backgroundColor='transparent'
            _hover
          >
            { postData.user.name }
          </Button>
        </NextLink>
      </Flex>

      <Flex
        direction='column'
      >
        <Text
          padding='10px'
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
        direction='row'
        justifyContent='flex-end'
        padding='10px 10px'
      >
        <Flex
          direction='row'
          alignItems='center'
          marginRight={{ lg: '20px' }}
        >
          { returnLikeBtn() }
          <Text
            color='rgb(229, 62, 62)'
            padding='5px'
          >
            { likeState.length }
          </Text>
        </Flex>
        
      </Flex>

      <Flex
        direction='row'
        padding='5px'
      >
        <Input
          type='text'
          placeholder='Write a comment..'
          variant='filled'
          backgroundColor='rgb(23, 25, 35)'
          value={ contentState }
          border='1px solid'
          borderColor='rgb(229, 62, 62)'
          onChange={ (e) => setContentState( e.target.value ) }
        />
        <Button
          onClick={ () => handleCommentSend() }
          backgroundColor='transparent'
          borderWidth='1px'
          borderColor='rgb(229, 62, 62)'
          _hover
        >
          Send
        </Button>
      </Flex>

    </Flex>
  );
};