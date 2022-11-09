import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Avatar,
  FormLabel,
  Button,
  Input,
  IconButton
} from '@chakra-ui/react';

import { CloseIcon } from '@chakra-ui/icons';

export const UpdateProfileForm = ({ setIsOpen, userData }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [ nameState, setNameState ] = useState( userData.name );
  const [ genderState, setGenderState ] = useState( userData.gender );
  const [ bioState, setBioState ] = useState( userData.profileBio );

  //this function handles if form is submitted
  const handleClick = async () => {
    try {
      const response = await axios({
        method: 'put',
        url: '/api/user/update',
        withCredentials: true,
        data: {
          name: nameState,
          gender: genderState,
          profileBio: bioState
        },
      });
  
      console.log( response.data );
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
        justifyContent='center'
        padding='10px'
      >
        <Avatar
          src={ userData.image }
          alt={ userData.name }
          size='lg'
          borderWidth='5px'
          borderColor='red.500'
          borderStyle='double'
        />
      </Flex>

      <Flex
        direction={ 'column' }
        alignItems='center'
        padding='10px'
      >
        <FormLabel 
          htmlFor='name'
        >
          Name:
        </FormLabel>
        <Input
          type='text'
          id='name'
          name='name'
          value={ nameState }
          onChange={ (e) => setNameState( e.target.value ) }
          variant='filled'
          backgroundColor='gray.900'
          marginBottom='10px'
          placeholder='Update Name'
        />

        <FormLabel 
          htmlFor='gender'
        >
          Gender:
        </FormLabel>
        <Input
          type='text'
          id='gender'
          name='gender'
          value={ genderState }
          onChange={ (e) => setGenderState( e.target.value ) }
          variant='filled'
          backgroundColor='gray.900'
          marginBottom='10px'
          placeholder='Update Gender'
        />

        <FormLabel 
          htmlFor='profileBio'
        >
          Profile Bio:
        </FormLabel>
        <Input
          type='text'
          id='profileBio'
          name='profileBio'
          value={ bioState }
          onChange={ (e) => setBioState( e.target.value ) }
          variant='filled'
          backgroundColor='gray.900'
          marginBottom='10px'
          placeholder='Update Bio'
        />

        <Button
          backgroundColor='red.500'
          color='gray.900'
          borderWidth='5px'
          borderColor='gray.900'
          borderStyle='double'
          onClick={ () => handleClick() }
        >
          Update Profile
        </Button>
      </Flex>

    </Box>
  );
};