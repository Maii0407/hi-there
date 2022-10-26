import { useSession, signIn, signOut, getProviders } from 'next-auth/react';

//import connectMongo from '../utils/connectMongo';
//import User from '../models/userModel';

import { Box, Button } from "@chakra-ui/react";

export default function Home({ providers }) {
  const { data: session } = useSession();

  console.log( 'session', session );

  if( session ) {
    return(
      <Box
        display={ 'flex' }
        color={ 'red.500' }
      >
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
    <Box>
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