import { signIn, getProviders } from 'next-auth/react';

import {
  Box,
  Flex,
  Button,
  Heading,
  Text
} from "@chakra-ui/react"

export default function Login({ providers }) {  
  const providersArray = Object.values( providers );

  return(
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      position='fixed'
      width='100%'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        direction='column'
        marginBottom='20px'
      >
        <Heading
          color='red.500'
          textAlign='center'
        >
          hiTHERE
        </Heading>
        <Text
          color='red.500'
          textAlign='center'
        >
          Just a facebook clone. Connect with your friends and the world around you through hiTHERE.
        </Text>
      </Flex>
      <Flex
        direction='column'
        justifyContent='center'
        borderWidth='5px'
        borderColor='red.500'
        borderStyle='double'
        borderRadius='5px'
        padding='10px 20px'
        width={{ lg: '50%' }}
      >
        <Button
          onClick={ () => signIn( providersArray[0].id, { callbackUrl: 'http://localhost:3000' }) }
          color='white'
          bgColor='blue.700'
          borderWidth='5px'
          borderColor='gray.900'
          borderStyle='double'
          margin='5px'
          _hover={{ filter: 'auto', brightness: '70%' }}
        >
          { providersArray[0].name } Login
        </Button>
        <Button
          onClick={ () => signIn( providersArray[1].id, { callbackUrl: 'http://localhost:3000' }) }
          color='gray.900'
          bgColor='red.600'
          borderWidth='5px'
          borderColor='gray.900'
          borderStyle='double'
          margin='5px'
          _hover={{ filter: 'auto', brightness: '70%' }}
        >
          { providersArray[1].name } Login
        </Button>
      </Flex>
    </Flex>
  )
};

export async function getServerSideProps( context ) {
  try {
    const providers = await getProviders();

    return {
      props: {
        providers
      },
    }
  }
  catch( error ) {
    console.log( error );
    return {
      notFound: true,
    }
  }
};