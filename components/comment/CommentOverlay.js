import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { CommentCard } from './CommentCard';

import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
} from '@chakra-ui/react';

export const CommentOverlay = ({ postData, commentArray }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return(
    <Box
      height='100%'
      width='100%'
      backgroundColor='gray.800'
      display='flex'
      flexDirection='column'
      justifyContent={{ lg: 'center' }}
    >

      <Flex
        direction='column'
        padding={{ lg: '0 200px' }}
        justifyContent={{ lg: 'center' }}
      >
        {
          commentArray.map(( comment ) => {
            return <CommentCard key={ comment._id } commentData={ comment } />
          })
        }
      </Flex>

    </Box>
  );
};