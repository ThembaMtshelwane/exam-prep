import React, { useState, createContext } from 'react'
import { EditButton } from '../../buttons/EditButton'
import DisplayList from '../../lists/DisplayList'
import { Box, Text, Image, Flex } from '@chakra-ui/react'
import { AddResourcesList } from '../../lists/AddResourcesList'

type previewProps = {
  questionPreview: any
  name: string
}

const PreviewCard: React.FC<previewProps> = ({ questionPreview, name }) => {
  const [questionPreviewData, setQuestionPreview] = useState<any>({
    ...questionPreview,
  })
  const {
    questionID,
    fileURL,
    question,
    questionAnswer,
    questionOptions,
    questionResources,
    questionLevel,
    questionLearningObjectives,
  } = questionPreviewData

  // Function to update questionPreview in the parent component
  const updateQuestionPreview = (updatedData: any) => {
    // Update questionPreview state with the updatedData
    setQuestionPreview(updatedData)
  }

  return (
    <Box boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)" m={2} p={5}>
      <Text>Question ID: {questionID}</Text>
      <Text>Question: {question}</Text>
      {fileURL ? (
        <Flex justifyContent="center" p="2rem">
          <Image
            src={fileURL}
            alt={questionID}
            width="50%"
            height="50% "
            align="center"
          />
        </Flex>
      ) : (
        ''
      )}

      <Text>Answer: {questionAnswer}</Text>
      <Text>Level:{questionLevel}</Text>
      <Text>Learning Objective/s:{questionLearningObjectives}</Text>
      <DisplayList data={questionOptions} heading={'Options'} />
      {questionResources ? (
        <DisplayList data={questionResources} heading={'Resources'} />
      ) : (
        ''
      )}
      <br />
      <EditButton
        questionID={questionID}
        name={name}
        level={questionLevel}
        questionPreview={questionPreview}
        updateQuestionPreview={updateQuestionPreview}
      />
    </Box>
  )
}

export default PreviewCard
