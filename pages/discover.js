import { signOut } from 'next-auth/react';

//import connectMongo from '../utils/connectMongo';
//import User from '../models/userModel';

import { Box, Button, Text } from "@chakra-ui/react";

export default function Discover() {

  return(
    <Box
      display={ 'flex' }
      color={ 'red.500' }
    >
      <Text>
        Discover Page
      </Text>
      <Button
        onClick={ () => signOut()}
        color={ 'red.500' }
        bgColor={ 'blackAlpha.500' }
        borderWidth={ '1px' }
        borderColor={ 'red.500' }
      >
        Im Out
      </Button>
    </Box>
  )
};