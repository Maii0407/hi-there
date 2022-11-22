import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'

import { 
  Flex,
  Button, 
  Avatar
 } from '@chakra-ui/react';

 //TODO finish this
 //add axios request functions
export const RequestCard = ({ requestData }) => {
  const router = useRouter();

  const directToStranger = () => {};

  const acceptReq = () => {};

  const rejectReq = () => {};

  return(
    <Flex
      direction='row'
      margin='5px'
      padding='5px 10px'
      border='1px'
      borderColor='red.500'
      borderRadius='5px'
    >
      <Avatar
        src={ requestData.image }
        alt={ requestData.name }
        size='lg'
      />

      <Flex
        width='100%'
        direction='column'
      >
        <Button
          size='sm'
          variant='ghost'
          color='red.500'
        >
          { requestData.name }
        </Button>

        <Flex
          justifyContent='space-around'
          padding='5px'
        >
          <Button
            variant='solid'
            backgroundColor='red.500'
            size='sm'
          >
            Accept
          </Button>
          <Button
            variant='outline'
            borderColor='red.500'
            color='red.500'
            size='sm'
          >
            Reject
          </Button>
        </Flex>
        
      </Flex>
    </Flex>
  );
};