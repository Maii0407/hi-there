import React from 'react';

import { 
  Flex,
  Button, 
  Avatar
 } from '@chakra-ui/react';

export const RequestCard = ({ requestData }) => {
  return(
    <Flex>
      <Avatar/>

      <Flex>
        <Button></Button>

        <Flex>
          <Button></Button>
          <Button></Button>
        </Flex>
        
      </Flex>
    </Flex>
  );
};