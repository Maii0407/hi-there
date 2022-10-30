import React from 'react';

import {
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  Button
} from '@chakra-ui/react';

//TODO finish this
//image for post image must have a fallback so if post containt no image than return nothing
//use function
export const PostCard = ({ postData }) => {
  return (
    <Flex
      direction={ 'column' }
    >
      <Box>
        <Avatar
          src={ postData.user.image }
        />
        <Text>
          { postData.user.name }
        </Text>
      </Box>

      <Box>
        <Text>
          { postData.content }
        </Text>
        {
          postData.image ? (
            <Image
              src={ postData.image }
              alt='post image content'
            />
          ) : null
        }
      </Box>

      <Box>
        <Button>
          Likes Number
        </Button>
        <Button>
          Comments Number
        </Button>
      </Box>

      <Box>
        <Button>
          Like
        </Button>
        <Button>
          Comment
        </Button>
      </Box>
    </Flex>
  );
};