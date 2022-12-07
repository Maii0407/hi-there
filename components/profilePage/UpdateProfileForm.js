import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
  Flex,
  Avatar,
  FormLabel,
  Button,
  Input,
  IconButton
} from '@chakra-ui/react';

import { CloseIcon } from '@chakra-ui/icons';

export const UpdateProfileForm = ({ setIsOpen, userData }) => {
  const router = useRouter();

  const [ nameState, setNameState ] = useState( userData.name );
  const [ genderState, setGenderState ] = useState( userData.gender );
  const [ bioState, setBioState ] = useState( userData.profileBio );
  const [ imageState, setImageState ] = useState( userData.image );

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
      //below code reload session
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
    }
  };

  return(
    <Flex
      justifyContent={{ lg: 'center' }}
      alignItems={{ lg: 'center' }}
      position='fixed'
      height='100%'
      width='100%'
      backgroundColor='rgba(0,0,0,0.7)'
      zIndex='6'
      top='0'
      right='0'
    >

      <Flex
        direction='column'
        width={{ base: '100%', lg: '70%' }}
        backgroundColor='gray.900'
        borderRadius={{ lg: '10px' }}
      >
        <Flex
          borderBottom='1px'
          borderColor='red.500'
          direction='row'
          justifyContent={{ lg: 'flex-end' }}
        >
          <IconButton
            icon={ <CloseIcon/> }
            backgroundColor='transparent'
            color='red.500'
            onClick={ () => setIsOpen( false ) }
            _hover
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
          direction='column'
          alignItems='center'
          padding='10px'
        >
          <FormLabel 
            htmlFor='image'
          >
            Name:
          </FormLabel>
          <Input
            type='text'
            id='image'
            name='image'
            value={ imageState }
            onChange={ (e) => setImageState( e.target.value ) }
            variant='filled'
            backgroundColor='gray.900'
            marginBottom='10px'
            placeholder='Update Name'
            borderColor='red.500'
            borderRadius='0'
          />

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
            borderColor='red.500'
            borderRadius='0'
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
            borderColor='red.500'
            borderRadius='0'
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
            borderColor='red.500'
            borderRadius='0'
          />

          <Button
            backgroundColor='red.500'
            color='gray.900'
            borderWidth='5px'
            borderColor='gray.900'
            borderStyle='double'
            alignSelf={{ lg: 'flex-end' }}
            onClick={ () => handleClick() }
            _hover
          >
            Update Profile
          </Button>
        </Flex>
      </Flex>

    </Flex>
  );
};