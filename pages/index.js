import { useSession, signIn, signOut, getProviders } from 'next-auth/react';

import connectMongo from '../utils/connectMongo';
import Post from '../models/postModel';
import User from '../models/userModel';

import { PostCard } from '../components/PostCard';
import {
  Box,
  Button,
  Text,
  Flex
} from "@chakra-ui/react";

//TODO complete this
//show posts by friends and user
export default function Home({ providers, posts }) {
  const { data: session } = useSession();

  console.log( posts );

  if( session ) {
    return(
      <Flex
        direction={ 'column' }
        color={ 'red.500' }
      >
        {
          posts.map((post) => {
            return <PostCard key={ post._id } postData={ post } />
          })
        }
        home
      </Flex>
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
  try {
    const providers = await getProviders();

    await connectMongo();

    const posts = await Post.find().sort({ date: -1 })
      .populate({ path: 'user', model: User });

    return {
      props: { 
        providers,
        posts: JSON.parse( JSON.stringify( posts ))
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

// export async function getServerSideProps() {
//  try {
//    await connectMongo();

//    const users = await User.find();

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
// };