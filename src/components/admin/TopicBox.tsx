import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import DeleteButton from '../buttons/DeleteButton'
import PreviewButton from '../buttons/PreviewButton'

type TopicBoxProps = {
  topicURL: string
  topicName: string
  courseCode: string
  numOfLOs: number
  timeOfCreation: any
  dueDate: any
}

const TopicBox: React.FC<TopicBoxProps> = ({
  topicURL,
  topicName,
  courseCode,
  numOfLOs,
  timeOfCreation,
  dueDate,
}) => {
  return (
    <div>
      <Box
        fontWeight={700}
        bg="white"
        boxShadow="1px 1px 1px 2px rgba(97, 143, 217, .75)"
        p="10px"
        _hover={{
          bg: '#265e9e',
          color: 'white',
          transform: 'scale(0.98)',
        }}
        width="95%"
        height="50%"
        borderRadius={0}
      >
        <Flex direction="column" alignItems="center" textAlign="center">
          <Text>Topic: {topicName}</Text>
          <Text>Course Code: {courseCode}</Text>
          <Text>Number of learning objectives: {numOfLOs}</Text>
          <Text>
            Created at:{' '}
            {new Date(timeOfCreation.seconds * 1000).toLocaleDateString(
              'en-GB'
            )}
          </Text>
          {/* <Text>
            Due date:{' '}
            {new Date(dueDate.seconds * 1000).toLocaleDateString('en-GB')}
          </Text> */}
          <Flex flexDirection="row" margin="1rem">
            <PreviewButton topicURL={topicURL} />
            <DeleteButton topicName={topicName} />
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}
export default TopicBox
