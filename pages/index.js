import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';

import { LoginBtn } from '../components/loginBtn';

import { Box, Button } from "@chakra-ui/react";

export default function Home({ users }) {
  console.log( users );

  return(
    <Box display='flex' flexDir='column'>
      <Box color='red'>
        { `There is ${ users.length } users found.` }
      </Box>
      <LoginBtn/>
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