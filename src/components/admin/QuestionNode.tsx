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
import { EditButton } from '../buttons/EditButton'

interface BlockProps {
  content: string
  id: string
  topicID: string
}

const QuestionNode: React.FC<BlockProps> = ({ content, id, topicID }) => {
  // use the id to create a question
  return (
    <div>
      <h1>{content}</h1>
      <EditButton questionID={id} name={topicID} fileURL={''} />
    </div>
  )
}

export default QuestionNode
