import React, { useState } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { links } from './pageLinkData';

import {
  Box,
  Flex,
  useDisclosure,
  IconButton,
  Text,
  Avatar,
  Link,
  Stack,
  Button,
  FormControl,
  Textarea
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ formOpen, setFormOpen ] = useState( false );

  const [ postContent, setPostContent ] = useState('');

  const { data: session } = useSession();

  //this function handles if form is submitted
  const handleClick = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/post/create',
        withCredentials: true,
        data: {
          content: postContent,
          image: '',
          user: session.user.id
        },
      });
  
      console.log( response.data );
      return response.data;
    }
    catch( error ) {
      console.log( error );
    }
    finally {
      setPostContent('');
      setFormOpen( false );
    }
  };
  
  if( session ) {
    return (
      <Box
        p={ '0 10px' }
        borderBottom={ '5px' }
        borderColor={ 'red.500' }
        borderStyle={ 'double' }
      >
        <Flex
          h={ 16 }
          alignItems={ 'center' }
          justifyContent={ 'space-between' }
        >
          <IconButton
            size={ 'md' }
            icon={ isOpen ? <CloseIcon color={ 'red.500' }/> : <HamburgerIcon color={ 'red.500' }/> }
            onClick={ isOpen ? onClose : onOpen }
            backgroundColor={ 'transparent' }
          />
          <Text
            fontSize={ 'md' }
            color={ 'red.500' }
          >
            hiTHERE
          </Text>
          <Button
            leftIcon={ <AddIcon/> }
            color={ 'gray.900' }
            size={ 'sm' }
            backgroundColor={ 'red.500' }
            onClick={ () => setFormOpen( true ) }
          >
            Post
          </Button>
          <Avatar
            size={ 'sm' }
            name={ session.user.name }
            src={ session.user.image }
          />
        </Flex>

        {
          isOpen ? (
            <Box
              pb={ 4 }
            >
              <Stack
                as={ 'nav' }
                spacing={ 4 }
              >
                {
                  links.map(( link ) => {
                    return <NextLink
                      href={ `/${ link.href }` }
                      passHref
                      key={ link.name }
                    >
                      <Link
                        color={ 'red.500' }
                        onClick={ isOpen ? onClose : onOpen }
                      >
                        { link.name }
                      </Link>
                    </NextLink>
                  })
                }
              </Stack>
            </Box>
          ) : null
        }

        {
          formOpen ? (
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
                <Textarea
                  placeholder={ `What's on your mind?` }
                  color={ 'red.500' }
                  resize={ 'vertical' }
                  borderColor={ 'red.500' }
                  borderRadius={ '0' }
                  value={ postContent }
                  onChange={ ( e ) => setPostContent( e.target.value ) }
                />
                <Button
                  color={ 'gray.900' }
                  backgroundColor={ 'red.500' }
                  size={ 'md' }
                  padding={ '0 30px' }
                  onClick={ () => handleClick() }
                >
                  Post
                </Button>
              </FormControl>
            </Box>
          ) : null
        }
      </Box>
    )
  };

  return;
};