import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';

import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
import Post from '../../models/postModel';
import Comment from '../../models/commentModel';
import { authOptions } from '../api/auth/[...nextauth]';
import { CommentOverlay } from '../../components/comment/CommentOverlay';

import { DetailedPost } from '../../components/post/DetailedPost';

import {
  Flex,
  Text
} from "@chakra-ui/react";

export default function PostPage({ currentPost, commentList }) {
  const { data: session } = useSession();

  if( session ) {
    return(
      <Flex
        width={{ lg: '75vw' }}
        direction='column'
        color='red.500'
        justifyContent={{ lg: 'center' }}
        padding={{ lg: '0 100px' }}
      >
        <DetailedPost postData={ currentPost } />

        <Text
          color='red.500'
          borderBottom='5px double'
          borderColor='red.500'
          padding='10px'
          margin='5px 5px 10px'
        >
          { commentList.length } Comments
        </Text>

        <CommentOverlay postData={ currentPost } commentArray={ commentList } />
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