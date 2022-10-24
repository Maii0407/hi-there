import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';

import { Box } from "@chakra-ui/react";
import { normalizeRepeatedSlashes } from 'next/dist/shared/lib/utils';

export default function Home({ users }) {
  return(
    <Box display='grid' gridTemplateColumns='1fr 1fr 1fr'>
      {
        users.map(( user ) => {
          return <Box key={ user._id } color='red' borderWidth='1px' borderRadius='lg' borderColor='red'>
            { user.displayName }
          </Box>
        })
      }
    </Box>
  );
};

export async function getServerSideProps() {
  try {
    await connectMongo();

    const users = await User.find();

    return {
      props: {
        users: JSON.parse( JSON.stringify( users )),
      }
    };
  }
  catch( error ) {
    console.log( error );
    return {
      notFound: true,
    };
  }
};