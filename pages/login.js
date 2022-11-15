import { signIn, getProviders } from 'next-auth/react';

// import connectMongo from '../utils/connectMongo';
// import Post from '../models/postModel';
// import User from '../models/userModel';
// import Comment from '../models/commentModel';

import {
  Box,
  Flex,
  Button
} from "@chakra-ui/react"

export default function Login({ providers }) {
  return(
    <Box
      position={ 'fixed' }
      width={ '100%' }
      height={ '100%' }
      display={ 'flex' }
      justifyContent={ 'center' }
      alignItems={ 'center' }
    >
      <Flex
        direction='column'
        justifyContent='center'
        borderWidth={ '5px' }
        borderColor={ 'red.500' }
        borderStyle={ 'double' }
        borderRadius={ '5px' }
        padding={ '10px 20px' }
      >
        {
          Object.values( providers ).map(( provider ) => {
            return(
              <Button
                key={ provider.name }
                onClick={ () => signIn( provider.id, { callbackUrl: 'http://localhost:3000' } )}
                color={ 'red.500' }
                bgColor={ 'black' }
                margin='5px'
              >
                { provider.name } Login
              </Button>
            )
          })
        }
      </Flex>
    </Box>
  )
};

export async function getServerSideProps( context ) {
  try {
    const providers = await getProviders();

    // await connectMongo();

    // const posts = await Post.find().sort({ date: -1 })
    //   .populate({ path: 'user', model: User });
    
    //   const comments = await Comment.find().sort({ date: -1 })
    //     .populate({ path: 'user', model: User });

    return {
      props: {
        providers,
        // posts: JSON.parse( JSON.stringify( posts )),
        // comments: JSON.parse( JSON.stringify( comments ))
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