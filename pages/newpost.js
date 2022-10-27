import { signOut } from 'next-auth/react';

import { useSession } from 'next-auth/react';

import { PostForm } from '../components/PostForm';

import { Button, Flex, Box, Avatar } from "@chakra-ui/react";

//TODO finish this
//connect it to api
export default function NewPost() {
  const { data: session } = useSession();

  return(
    <Flex
      direction={ 'column' }
      color={ 'red.500' }
    >
      <Flex
        direction={ 'row' }
        padding={ '10px 20px' }
      >
        <Avatar
          src={ session.user.image }
          alt={ session.user.name }
          size={ 'md' }
        />
        <Button
          backgroundColor={ 'transparent' }
        >
          { session.user.name }
        </Button>
      </Flex>

      <PostForm />
      <Button
        onClick={ () => signOut()}
        color={ 'red.500' }
        bgColor={ 'blackAlpha.500' }
        borderWidth={ '1px' }
        borderColor={ 'red.500' }
      >
        Im Out
      </Button>
    </Flex>
  )
};