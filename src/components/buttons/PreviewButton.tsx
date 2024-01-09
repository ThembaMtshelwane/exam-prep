import { Button } from '@chakra-ui/react';
import React from 'react';

type PreviewButtonProps = {
  topicURL: string
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ topicURL }) => {
  return (
    <a href={topicURL}>
      <Button
        bg="#265e9e"
        color="white"
        _hover={{
          bg: 'white',
          color: '#265e9e',
          transform: 'scale(0.98)',
        }}
      >
        Preview
      </Button>
    </a>
  )
}
export default PreviewButton;