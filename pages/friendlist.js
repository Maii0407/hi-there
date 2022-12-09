import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';
import { authOptions } from './api/auth/[...nextauth]';

import { FriendCard } from '../components/FriendCard';

import { 
  Flex,
  Text,
  Box
} from "@chakra-ui/react";

export default function FriendList({ currentUser }) {
  const { data: session } = useSession();
  const router = useRouter();

  const noFriends = currentUser.friends.length === 0;

  if( session ) {
    return (
      <Flex
        direction='column'
        justifyContent={{ lg: 'center' }}
        padding={{ lg: '0 100px' }}
      >
        <Flex
          borderBottom='5px'
          borderColor='rgb(229, 62, 62)'
          borderStyle='double'
          padding='10px'
          margin='0 5px'
        >
          <Text
            color='rgb(229, 62, 62)'
          >
            Friends List - { currentUser.friends.length }
          </Text>
        </Flex>

        <Box
          display={{ base: 'flex', lg: 'grid' }}
          flexDirection='column'
          justifyContent='center'
          gridTemplateColumns={{ lg: 'repeat( 4, 1fr )' }}
        >
          {
            noFriends ? (
              <Text
                color='rgb(229, 62, 62)'
                width='100%'
                textAlign='center'
                marginTop='20px'
              >
                So Empty...
              </Text>
            ) : currentUser.friends.map(( friend ) => {
              return <FriendCard key={ friend._id } friendData={ friend } />
            })
          }
        </Box>

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