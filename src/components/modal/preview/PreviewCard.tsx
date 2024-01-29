import React, { useState } from 'react'
import { EditButton } from '../../buttons/EditButton'
import DisplayList from '../../lists/DisplayList'
import { Box, Text, Image, Flex } from '@chakra-ui/react'

type previewProps = {
  questionPreview: any
  name: string
}

const PreviewCard: React.FC<previewProps> = ({
  questionPreview,
  name,
}) => {
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
      <Text>Question ID: {questionID ? questionID : ''}</Text>
      <Text>Question: {question ? question : ''}</Text>
      {fileURL ? (
        <Flex justifyContent="center" p="2rem">
          <Image
            src={fileURL ? fileURL : null}
            alt={questionID ? questionID : 0}
            width="50%"
            height="50% "
            align="center"
          />
        </Flex>
      ) : (
        ''
      )}

      <Text>Answer: {questionAnswer ? questionAnswer : ''}</Text>
      <Text>Level:{questionLevel ? questionLevel : ''}</Text>
      <Text>
        Learning Objective/s:{' '}
        {questionLearningObjectives ? questionLearningObjectives : ''}
      </Text>
      <DisplayList
        data={questionOptions ? questionOptions : ['', '', '', '', '']}
        heading={'Options'}
      />
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
