import React, { useState } from 'react';

import {
  FormControl,
  Button,
  Textarea
} from '@chakra-ui/react';

//TODO finish this
export const PostForm = () => {
  const [ contentState, setContent ] = useState('');

  //TODO do this
  //maybe use axios
  const handleSubmit = () => {};

  return (
    <FormControl
      display={ 'flex' }
      flexDirection={ 'column' }
      alignItems={ 'center' }
      padding={ '10px' }
    >
      <Textarea
        placeholder={ `What's on your mind?` }
        color={ 'red.500' }
        resize={ 'vertical' }
        borderColor={ 'red.500' }
      />
      <Button
        color={ 'gray.900' }
        backgroundColor={ 'red.500' }
        size={ 'md' }
      >
        Post
      </Button>
    </FormControl>
  );
};