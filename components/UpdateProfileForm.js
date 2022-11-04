import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

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

//TODO finish the handleclick function of this component
export const UpdateProfileForm = ({ setIsOpen, userData }) => {
  const { data: session } = useSession();

  const [ nameState, setNameState ] = useState( userData.name );
  const [ genderState, setGenderState ] = useState( userData.gender );
  const [ bioState, setBioState ] = useState( userData.profileBio );

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
          src={ session.user.image }
          alt={ session.user.name }
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
          id='name'
          name='name'
          value={ nameState }
          onChange={ (e) => setNameState( e.target.value ) }
          variant='filled'
          backgroundColor='gray.900'
          marginBottom='10px'
        />

        <FormLabel 
          htmlFor='gender'
        >
          Gender:
        </FormLabel>
        <Input
          id='gender'
          name='gender'
          value={ genderState }
          onChange={ (e) => setGenderState( e.target.value ) }
          variant='filled'
          backgroundColor='gray.900'
          marginBottom='10px'
        />

        <FormLabel 
          htmlFor='profileBio'
        >
          Profile Bio:
        </FormLabel>
        <Input
          id='profileBio'
          name='profileBio'
          value={ bioState }
          onChange={ (e) => setBioState( e.target.value ) }
          variant='filled'
          backgroundColor='gray.900'
          marginBottom='10px'
        />

        <Button
          backgroundColor='red.500'
          color='gray.900'
          borderWidth='5px'
          borderColor='gray.900'
          borderStyle='double'
        >
          Update Profile
        </Button>
      </Flex>

    </Box>
  );
};