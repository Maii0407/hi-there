import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';
import { authOptions } from './api/auth/[...nextauth]';

import { RequestCard } from '../components/RequestCard';

import { 
  Box,
  Flex,
  Text
 } from "@chakra-ui/react";

export default function RequestList({ currentUser }) {
  const { data: session } = useSession();

  const noRequest = currentUser.requestsReceived.length === 0;
  
  if( session ) {
    return (
      <Flex
        direction='column'
        justifyContent={{ lg: 'center' }}
        padding={{ lg: '0 100px' }}
      >
        <Flex
          borderBottom='5px'
          borderColor='#E53E3E'
          borderStyle='double'
          padding='10px'
          margin='0 5px'
        >
          <Text
            color='#E53E3E'
          >
            Friend Requests - { currentUser.requestsReceived.length }
          </Text>
        </Flex>

        <Box
          display={{ base: 'flex', lg: 'grid' }}
          flexDirection='column'
          justifyContent='center'
          gridTemplateColumns={{ lg: 'repeat( 4, 1fr )' }}
        >
          {
            noRequest ? (
              <Text
                color='#E53E3E'
                width='100%'
                textAlign='center'
                marginTop='20px'
              >
                So Empty...
              </Text>
            ) : currentUser.requestsReceived.map(( stranger ) => {
              return <RequestCard key={ stranger._id } requestData={ stranger } />
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
        .populate({ path: 'requestsReceived', model: User });
  
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