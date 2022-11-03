import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
import Post from '../../models/postModel';

import { ProfileCard } from '../../components/ProfileCard';
import { PostCard } from '../../components/PostCard';

import {
  Flex,
} from "@chakra-ui/react";

export default function StrangerProfile({ stranger, strangerPosts }) {
  return(
    <Flex
      direction={ 'column' }
      color={ 'red.500' }
    >
      <ProfileCard userData={ stranger } postLength={ strangerPosts } />
      {
        strangerPosts.map((post) => {
          return <PostCard key={ post._id } postData={ post } />
        })
      }
    </Flex>
  )
};

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    await connectMongo();

    const strangerData = await User.findById( id );
    const strangerPosts = await Post.find({ user: id }).sort({ date: -1 })
      .populate({ path: 'user', model: User });

    return {
      props: {
        stranger: JSON.parse( JSON.stringify( strangerData )),
        strangerPosts: JSON.parse( JSON.stringify( strangerPosts )),
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