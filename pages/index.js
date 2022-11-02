import { useSession, signIn, getProviders } from 'next-auth/react';

import connectMongo from '../utils/connectMongo';
import Post from '../models/postModel';
import User from '../models/userModel';

import { PostCard } from '../components/PostCard';
import {
  Box,
  Button,
  Flex
} from "@chakra-ui/react";

export default function Home({ providers, posts }) {
  const { data: session } = useSession();

  if( session ) {
  //this logic filters index posts to show only posts from user and user.friends
    const userAndFriend = [ session.user.id ];

    session.user.friends.forEach( ( friend ) => {
      userAndFriend.push( friend._id );
    });

    const filteredPosts = posts.filter( post  =>  userAndFriend.includes( post.user._id ));

    return(
      <Flex
        direction={ 'column' }
        color={ 'red.500' }
      >
        {
          filteredPosts.map((post) => {
            return <PostCard key={ post._id } postData={ post } />
          })
        }
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