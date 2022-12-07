import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';

import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
import Post from '../../models/postModel';
import Comment from '../../models/commentModel';
import { authOptions } from '../api/auth/[...nextauth]';

import { PostCard } from '../../components/post/PostCard';

import {
  Flex,
} from "@chakra-ui/react";

//TODO finish this
export default function DetailedPost({ currentPost, commentList }) {
  const { data: session } = useSession();

  if( session ) {
    return(
      <Flex
        direction='column'
        backgroundColor='gray.900'
        color='red.500'
      >
        <PostCard postData={ currentPost } commentArray={ commentList } />
      </Flex>
    )
  }
};

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      const { id } = context.query;
      await connectMongo();

      const currentPost = await Post.findById( id )
        .populate({ path: 'user', model: User });

      const commentList = await Comment.find({ post: id }).sort({ date: -1 })
        .populate({ path: 'user', model: User });
  
      return {
        props: {
          currentPost: JSON.parse( JSON.stringify( currentPost )),
          commentList: JSON.parse( JSON.stringify( commentList )),
        },
      }
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