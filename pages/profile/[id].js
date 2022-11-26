import { unstable_getServerSession } from 'next-auth';

import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
import Post from '../../models/postModel';
import Comment from '../../models/commentModel';
import { authOptions } from '../api/auth/[...nextauth]';

import { StrangerCard } from '../../components/profilePage/StrangerCard';
import { PostCard } from '../../components/PostCard';

import {
  Flex,
} from "@chakra-ui/react";

export default function StrangerProfile({ currentUser, stranger, strangerPosts, comments }) {
  //function to return filtered comments to pass as props
  const returnFilteredComments = ( someData ) => {
    const filteredComments = comments.filter( comment => comment.post === someData._id );

    return filteredComments;
  };

  return(
    <Flex
      direction={ 'column' }
      color={ 'red.500' }
    >
      <StrangerCard strangerData={ stranger } postLength={ strangerPosts } userData={ currentUser } />
      {
        strangerPosts.map((post) => {
          return <PostCard key={ post._id } postData={ post } commentArray={ returnFilteredComments( post )} />
        })
      }
    </Flex>
  )
};

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      const { id } = context.query;
      await connectMongo();
  
      const currentUser = await User.findById( session.user.id );

      const strangerData = await User.findById( id );
  
      const strangerPosts = await Post.find({ user: id }).sort({ date: -1 })
        .populate({ path: 'user', model: User });
  
      const comments = await Comment.find().sort({ date: -1 })
        .populate({ path: 'user', model: User });
  
      return {
        props: {
          currentUser: JSON.parse( JSON.stringify( currentUser )),
          stranger: JSON.parse( JSON.stringify( strangerData )),
          strangerPosts: JSON.parse( JSON.stringify( strangerPosts )),
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