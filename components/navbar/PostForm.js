import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { 
  Box,
  Flex,
  Avatar,
  Button,
  FormControl,
  Input,
  Textarea,
  IconButton
 } from '@chakra-ui/react';

 import { CloseIcon } from '@chakra-ui/icons';

export const PostForm = ({ setFormOpen }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [ postContent, setPostContent ] = useState('');
  const [ imageContent, setImageContent ] = useState('');

  //this function handles if form is submitted
  const onPostCreate = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/post/create',
        withCredentials: true,
        data: {
          content: postContent,
          image: imageContent,
          user: session.user.id
        },
      });
  
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      setPostContent('');
      setImageContent('');
      setFormOpen( false );
      router.push(router.asPath);
    }
  };

  return (
    <Box
      position={ 'fixed' }
      height={ '100%' }
      width={ '100%' }
      backgroundColor={ 'gray.900' }
      zIndex={ '1' }
      top={ '0' }
      right={ '0' }
    >
      <Box
        borderBottom={ '1px' }
        borderColor={ 'red.500' }
      >
        <IconButton
          icon={ <CloseIcon/> }
          backgroundColor={ 'transparent' }
          color={ 'red.500' }
          onClick={ () => setFormOpen( false ) }
        />
      </Box>
      <Flex
        direction={ 'row' }
        padding={ '10px 20px' }
      >
        <Avatar
          src={ session.user.image }
          alt={ session.user.name }
          size={ 'md' }
        />
        <Button
          backgroundColor={ 'transparent' }
          color={ 'red.500' }
        >
          { session.user.name }
        </Button>
      </Flex>
      <FormControl
        display={ 'flex' }
        flexDirection={ 'column' }
        alignItems={ 'center' }
        padding={ '10px' }
      >
        <Input
          value={ imageContent }
          onChange={(e) => setImageContent( e.target.value )}
          type='url'
          placeholder='Image URL...'
          variant='filled'
          color='red.500'
          backgroundColor='transparent'
          borderColor='red.500'
          borderRadius='0'
          marginBottom='10px'
        />
        <Textarea
          value={ postContent }
          onChange={ ( e ) => setPostContent( e.target.value ) }
          placeholder={ `What's on your mind?` }
          color={ 'red.500' }
          resize={ 'vertical' }
          borderColor={ 'red.500' }
          borderRadius={ '0' }
        />
        <Button
          color={ 'gray.900' }
          backgroundColor={ 'red.500' }
          size={ 'md' }
          padding={ '0 30px' }
          margin={ '10px' }
          onClick={ () => onPostCreate() }
        >
          Post
        </Button>
      </FormControl>
    </Box>
  );
};