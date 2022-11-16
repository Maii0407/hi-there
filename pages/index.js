import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';

import connectMongo from '../utils/connectMongo';
import Post from '../models/postModel';
import User from '../models/userModel';
import Comment from '../models/commentModel';
import { authOptions } from './api/auth/[...nextauth]';

import { PostCard } from '../components/PostCard';
import {
  Box,
  Button,
  Flex
} from "@chakra-ui/react";

export default function Home({ currentUser, posts, comments }) {
  const { data: session } = useSession();

  //function to return filtered comments to pass as props
  const returnFilteredComments = ( someData ) => {
    const filteredComments = comments.filter( comment => comment.post === someData._id );

    return filteredComments;
  };

  if( session ) {
  //this logic filters index posts to show only posts from user and user.friends
    const userAndFriend = [ session.user.id ];

    currentUser.friends.forEach( ( friend ) => {
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

      const currentUser = await User.findById( session.user.id );
      
      const posts = await Post.find().sort({ date: -1 })
      .populate({ path: 'user', model: User });
    
      const comments = await Comment.find().sort({ date: -1 })
        .populate({ path: 'user', model: User });
  
      return {
        props: {
          currentUser: JSON.parse( JSON.stringify( currentUser )),
          posts: JSON.parse( JSON.stringify( posts )),
          comments: JSON.parse( JSON.stringify( comments )),
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