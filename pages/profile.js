import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { useState } from 'react';

import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';
import Post from '../models/postModel';
import Comment from '../models/commentModel';
import { authOptions } from './api/auth/[...nextauth]';

import { ProfileCard } from '../components/profilePage/ProfileCard';
import { PostCard } from '../components/post/PostCard';
import { UpdateProfileForm } from '../components/profilePage/UpdateProfileForm';

import { Flex } from "@chakra-ui/react";

export default function Profile({ currentUser, userPost, comments }) {
  const { data: session } = useSession();
  
  const [ formOpen, setFormOpen ] = useState( false );

  //function to return filtered comments to pass as props
  const returnFilteredComments = ( someData ) => {
    const filteredComments = comments.filter( comment => comment.post === someData._id );

    return filteredComments;
  };

  if ( session ) {
    return(
      <Flex
        direction='column'
        color='rgb(229, 62, 62)'
        padding={{ lg: '0 100px' }}
      >
        <ProfileCard userData={ currentUser } postLength={ userPost } setIsOpen={ setFormOpen } />
        {
          userPost.map((post) => {
            return <PostCard key={ post._id } postData={ post } commentArray={ returnFilteredComments( post )} />
          })
        }
        { formOpen ? ( <UpdateProfileForm setIsOpen={ setFormOpen } userData={ currentUser } /> ) : null }
      </Flex>
    )
  };
};

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      await connectMongo();

      const currentUser = await User.findById( session.user.id );

      const posts = await Post.find({ user: session.user.id }).sort({ date: -1 })
        .populate({ path: 'user', model: User });

      const comments = await Comment.find().sort({ date: -1 })
        .populate({ path: 'user', model: User });
  
      return {
        props: {
          currentUser: JSON.parse( JSON.stringify( currentUser )),
          userPost: JSON.parse( JSON.stringify( posts )),
          comments: JSON.parse( JSON.stringify( comments ))
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