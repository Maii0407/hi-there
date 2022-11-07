//TODO make it so if press comment on each post
//pop out this overlay from bottom
import React from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input
} from '@chakra-ui/react';

//TODO finish this
export const CommentOverlay = ({ setIsOpen, postData }) => {
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

      <Flex></Flex>

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
        />
        <Button
          onClick={ () => console.log( 'send comment' ) }
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