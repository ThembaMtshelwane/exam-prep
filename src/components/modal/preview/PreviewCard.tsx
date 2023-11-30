import React from 'react'
import { EditButton } from '../../buttons/EditButton'
import CustomList from '../../lists/DisplayList'
import { Box, Text, Image } from '@chakra-ui/react'

type previewProps = {
  questionPreview: any
  name: string
}

const PreviewCard: React.FC<previewProps> = ({ questionPreview, name }) => {
  const {
    questionID,
    fileURL,
    question,
    questionAnswer,
    questionOptions,
    questionResources,
  } = questionPreview

  return (
    <Box boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)" m={2} p={5}>
      <Text>Question ID: {questionID}</Text>
      <Text>Question: {question}</Text>
      <Image src={fileURL} alt="" />
      <Text>Answer: {questionAnswer}</Text>
      <Text>Options:</Text>
      <CustomList data={questionOptions} />
      <CustomList data={questionResources} />
      <br />
      <EditButton questionID={questionID} name={name} fileURL={fileURL} />
    </Box>
  )
}

export default PreviewCard
