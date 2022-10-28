import { useSession, signIn, signOut, getProviders } from 'next-auth/react';

//import connectMongo from '../utils/connectMongo';
//import User from '../models/userModel';

import { Box, Button, Text } from "@chakra-ui/react";

//TODO complete this
//show posts by friends and user
//TODO seed fake users
export default function Home({ providers }) {
  const { data: session } = useSession();

  if( session ) {
    return(
      <Box
        display={ 'flex' }
        color={ 'red.500' }
      >
        <Text>
          Home
        </Text>
        <Button
          onClick={ () => signOut()}
          color={ 'red.500' }
          bgColor={ 'blackAlpha.500' }
          borderWidth={ '1px' }
          borderColor={ 'red.500' }
        >
          Im Out
        </Button>
      </Box>
    )
  }

  return(
    <Box
      position={ 'fixed' }
      width={ '100%' }
      height={ '100%' }
      display={ 'flex' }
      justifyContent={ 'center' }
      alignItems={ 'center' }
    >
      <Box
        borderWidth={ '5px' }
        borderColor={ 'red.500' }
        borderStyle={ 'double' }
        borderRadius={ '5px' }
        padding={ '10px 20px' }
      >
        {
          Object.values( providers ).map(( provider ) => {
            return(
              <Box key={ provider.name }>
                <Button
                  onClick={ () => signIn( provider.id, { callbackUrl: 'http://localhost:3000' } )}
                  color={ 'red.500' }
                  bgColor={ 'black' }
                >
                  Login in with { provider.name }
                </Button>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
};

export async function getServerSideProps( context ) {
  const providers = await getProviders();

  return {
    props: { providers },
  }
};
//export async function getServerSideProps() {
//  try {
//    await connectMongo();
//
//    const users = await User.find();
//
//    return {
//      props: {
//        users: JSON.parse( JSON.stringify( users )),
//      }
//    };
//  }
//  catch( error ) {
//    console.log( error );
//    return {
//      notFound: true,
//    };
//  }
//};