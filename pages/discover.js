import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]';
import connectMongo from '../utils/connectMongo';
import Post from '../models/postModel';
import User from '../models/userModel';
import Comment from '../models/commentModel';

import { PostCard } from '../components/post/PostCard';

import {
  Flex,
  Text
} from "@chakra-ui/react";

export default function Discover({ posts, comments }) {
  const { data: session } = useSession();

  //function to return filtered comments to pass as props
  const returnFilteredComments = ( someData ) => {
    const filteredComments = comments.filter( comment => comment.post === someData._id );

    return filteredComments;
  };

  if( session ) {
    return(
      <Flex
        direction='column'
        color='rgb(229, 62, 62)'
        justifyContent={{ lg: 'center' }}
        padding={{ lg: '0 100px' }}
      >
        <Text
          color='rgb(229, 62, 62)'
          borderBottom='5px double'
          borderColor='rgb(229, 62, 62)'
          padding='10px'
          margin='5px 5px 10px'
        >
          Discover
        </Text>
        {
          posts.map(( post ) => {
            return <PostCard key={ post._id } postData={ post } commentArray={ returnFilteredComments( post )} />
          })
        }
      </Flex>
    )
  }
};

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      await connectMongo();

      const posts = await Post.find().sort({ date: -1 })
        .populate({ path: 'user', model: User });
      
      const comments = await Comment.find().sort({ date: -1 })
        .populate({ path: 'user', model: User });

      return {
        props: {
          posts: JSON.parse( JSON.stringify( posts )),
          comments: JSON.parse( JSON.stringify( comments )),
        }
      };
    }
    catch( error ) {
      console.log( error );
      return {
        notFound: true,
      }
    }
  }
  else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
};