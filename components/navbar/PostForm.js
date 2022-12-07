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
    if( postContent === '' && imageContent === '' ) {
      console.log( 'post content emtpy' )
    }
    else {
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
    }
  };

  return (
    <Flex
      justifyContent={{ lg: 'center' }}
      alignItems={{ lg: 'center' }}
      position='fixed'
      height='100%'
      width='100%'
      backgroundColor='rgba(0,0,0,0.7)'
      zIndex='1'
      top='0'
      right='0'
    >

      <Flex
        width={{ base: '100%', lg: '70%' }}
        borderRadius={{ lg: '10px' }}
        direction='column'
        backgroundColor='gray.900'
      >
        <Flex
          direction='row'
          justifyContent={{ lg: 'flex-end' }}
          borderBottom='1px'
          borderColor='red.500'
        >
          <IconButton
            icon={ <CloseIcon/> }
            backgroundColor='transparent'
            color='red.500'
            onClick={ () => setFormOpen( false ) }
            _hover
          />
        </Flex>

        <Flex
          direction='row'
          padding='10px 20px'
        >
          <Avatar
            src={ session.user.image }
            alt={ session.user.name }
            size='md'
          />
          <Button
            backgroundColor='transparent'
            color='red.500'
            _hover
          >
            { session.user.name }
          </Button>
        </Flex>

        <FormControl
          display='flex'
          flexDirection='column'
          alignItems='center'
          padding='10px'
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
            color='red.500'
            resize='vertical'
            borderColor='red.500'
            borderRadius='0'
          />
          <Button
            color='gray.900'
            backgroundColor='red.500'
            size='md'
            padding='0 30px'
            margin='10px'
            onClick={ () => onPostCreate() }
            alignSelf={{ lg: 'flex-end' }}
            _hover
          >
            Post
          </Button>
        </FormControl>
      </Flex>
      
    </Flex>
  );
};