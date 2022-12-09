import { signIn, getProviders } from 'next-auth/react';

import {
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
      padding={{ lg: '10%' }}
    >
      <Flex
        direction='column'
        marginBottom={{ base: '20px' }}
      >
        <Heading
          color='#E53E3E'
          textAlign='center'
        >
          hiTHERE
        </Heading>
        <Text
          color='#E53E3E'
          textAlign='center'
        >
          Just a facebook clone. Connect with your friends and the world around you through hiTHERE.
        </Text>
      </Flex>
      <Flex
        direction='column'
        justifyContent='center'
        borderWidth='5px'
        borderColor='#E53E3E'
        borderStyle='double'
        borderRadius='5px'
        padding='10px 20px'
        width={{ lg: '50%' }}
      >
        <Button
          onClick={ () => signIn( providersArray[0].id, { callbackUrl: 'https://hi-there-production.up.railway.app/' }) }
          color='white'
          bgColor='#2C5282'
          borderWidth='5px'
          borderColor='#171923'
          borderStyle='double'
          margin='5px'
          _hover={{ filter: 'auto', brightness: '70%' }}
        >
          { providersArray[0].name } Login
        </Button>
        <Button
          onClick={ () => signIn( providersArray[1].id, { callbackUrl: 'https://hi-there-production.up.railway.app/' }) }
          color='#171923'
          bgColor='#C53030'
          borderWidth='5px'
          borderColor='#171923'
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