import React from 'react'
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Image,
  Box,
} from '@chakra-ui/react'
interface BlockProps {
  content: string
}

const QuestionNode: React.FC<BlockProps> = ({ content }) => {
  return (
    <div>
      <Box
        border="2px solid black"
        width="100%"
        height="50%"
        textAlign="center"
      >
        <h1>{content}</h1>
      </Box>
    </div>
  )
}

export default QuestionNode
