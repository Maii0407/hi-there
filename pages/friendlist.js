import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';
import { authOptions } from './api/auth/[...nextauth]';

import { 
  Flex,
  Text
} from "@chakra-ui/react";

//TODO finish this
export default function FriendList({ currentUser }) {
  const { data: session } = useSession();
  const router = useRouter();

  const noFriends = currentUser.friends.length === 0;

  console.log({ currentUser });

  if( session ) {
    return (
      <Flex
        direction='column'
      >
        <Flex
          borderBottom='5px'
          borderColor='red.500'
          borderStyle='double'
          padding='10px'
          margin='0 5px'
        >
          <Text
            color='red.500'
          >
            Friends List - { currentUser.friends.length }
          </Text>
        </Flex>

        <Flex
          direction='column'
          justifyContent='center'
        >
          {
            noFriends ? (
              <Text
                color='red.500'
                width='100%'
                textAlign='center'
                marginTop='20px'
              >
                So Empty...
              </Text>
            ) : currentUser.friends.map(( friend ) => {
              return <Text color='red.500' key={ friend._id }>{ friend.name }</Text>
            })
          }
        </Flex>

      </Flex>
    );
  }
};

export async function getServerSideProps( context ) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if( session ) {
    try {
      await connectMongo();

      const currentUser = await User.findById( session.user.id )
        .populate({ path: 'friends', model: User });
  
      return {
        props: {
          currentUser: JSON.parse( JSON.stringify( currentUser )),
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