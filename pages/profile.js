import { unstable_getServerSession } from 'next-auth';
import { useState } from 'react';

import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';
import Post from '../models/postModel';
import { authOptions } from './api/auth/[...nextauth]';

import { ProfileCard } from '../components/ProfileCard';
import { PostCard } from '../components/PostCard';
import { UpdateProfileForm } from '../components/UpdateProfileForm';

import { Flex } from "@chakra-ui/react";

export default function Profile({ currentUser, userPost }) {
  const [ formOpen, setFormOpen ] = useState( false );

  return(
    <Flex
      direction={ 'column' }
      color={ 'red.500' }
    >
      <ProfileCard userData={ currentUser } postLength={ userPost } setIsOpen={ setFormOpen } />
      {
        userPost.map((post) => {
          return <PostCard key={ post._id } postData={ post } />
        })
      }
      { formOpen ? ( <UpdateProfileForm setIsOpen={ setFormOpen } userData={ currentUser } /> ) : null }
    </Flex>
  )
};

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      await connectMongo();

      const currentUser = await User.findById( session.user.id );
      const posts = await Post.find({ user: session.user.id }).sort({ date: -1 })
        .populate({ path: 'user', model: User });
  
      return {
        props: {
          currentUser: JSON.parse( JSON.stringify( currentUser )),
          userPost: JSON.parse( JSON.stringify( posts )),
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