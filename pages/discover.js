import connectMongo from '../utils/connectMongo';
import Post from '../models/postModel';
import User from '../models/userModel';

import { PostCard } from '../components/PostCard';

import {
  Flex,
  Button,
  Text
} from "@chakra-ui/react";

export default function Discover({ posts }) {

  return(
    <Flex
      direction={ 'column' }
      color={ 'red.500' }
    >
      {
        posts.map(( post ) => {
          return <PostCard key={ post._id } postData={ post } />
        })
      }
    </Flex>
  )
};

export async function getServerSideProps( context ) {
  try {
    await connectMongo();

    const posts = await Post.find().sort({ date: -1 })
      .populate({ path: 'user', model: User });

    return {
      props: {
        posts: JSON.parse( JSON.stringify( posts ))
      }
    };
  }
  catch( error ) {
    console.log( error );
    return {
      notFound: true,
    }
  }
};