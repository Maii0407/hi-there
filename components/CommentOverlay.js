import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input
} from '@chakra-ui/react';

//TODO finish this
//TODO make the fetch comments data function
export const CommentOverlay = ({ setIsOpen, postData, commentArray }) => {
  const { data: session } = useSession();

  const [ contentState, setContentState ] = useState('');

  //this function handles if form is submitted
  const handleCommentSend = async () => {
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
      setIsOpen( false );
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
        borderBottom={ '1px' }
        borderColor={ 'red.500' }
      >
        <IconButton
          icon={ <CloseIcon/> }
          backgroundColor={ 'transparent' }
          color={ 'red.500' }
          onClick={ () => setIsOpen( false ) }
        />
      </Flex>

      <Flex
        direction='row'
        justifyContent='space-between'
        padding='5px 10px'
      >
        <Button
          onClick={ () => console.log( 'num of likes' ) }
          backgroundColor='transparent'
        >
          num of likes
        </Button>
        <Button
          onClick={ () => console.log( 'Like' ) }
          backgroundColor='transparent'
          borderWidth='1px'
          borderColor='red.500'
          size='sm'
        >
          Like
        </Button>
      </Flex>

      <Flex
        direction='column'
      >
        {
          commentArray.map(( comment ) => {
            return <Box key={ comment._id } >{ comment.content }</Box>
          })
        }
      </Flex>

      <Flex
        direction='row'
        position='fixed'
        bottom='0'
        right='0'
        width='100%'
        padding='5px 10px'
      >
        <Input
          type='text'
          placeholder='Write a comment..'
          variant='filled'
          backgroundColor='gray.900'
          value={ contentState }
          onChange={ (e) => setContentState( e.target.value ) }
        />
        <Button
          onClick={ () => handleCommentSend() }
          backgroundColor='transparent'
          borderWidth='1px'
          borderColor='red.500'
        >
          Send
        </Button>
      </Flex>

    </Box>
  );
};