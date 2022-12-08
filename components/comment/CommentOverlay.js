import React from 'react';
import { useSession } from 'next-auth/react';

import { CommentCard } from './CommentCard';

import {
  Box,
  Flex,
} from '@chakra-ui/react';

export const CommentOverlay = ({ commentArray }) => {
  const { data: session } = useSession();

  return(
    <Box
      height='100%'
      width='100%'
      backgroundColor='gray.800'
      display='flex'
      flexDirection='column'
    >

      <Flex
        direction='column'
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