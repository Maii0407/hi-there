import { useSession } from 'next-auth/react';

import connectMongo from '../utils/connectMongo';
import Post from '../models/postModel';
import User from '../models/userModel';
import Comment from '../models/commentModel';

import { PostCard } from '../components/PostCard';

import {
  Flex,
  Button,
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
        direction={ 'column' }
        color={ 'red.500' }
      >
        {
          posts.map(( post ) => {
            return <PostCard key={ post._id } postData={ post } commentArray={ returnFilteredComments( post )} />
          })
        }
      </Flex>
    )
  }
};

//TODO use unstable get server session
export async function getServerSideProps( context ) {
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
};