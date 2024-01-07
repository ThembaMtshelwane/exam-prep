import { auth, firestore } from '@/src/firebase/clientApp'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLectureDataContext } from './LectureDataProvider'

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
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)
  const { lectureData, setLectureData } = useLectureDataContext()

  const deleteTopic = async (topicName: string) => {
    setIsLoading(true)
    try {
      // Reference to the document under /lecturers/document/quizSnippets
      const quizSnippetDocRef = doc(
        firestore,
        `lecturers/${user?.uid}/quizSnippets`,
        topicName
      )

      // Reference to the document under /topics
      const topicDocRef = doc(firestore, 'topics', topicName)

      // Delete documents
      await deleteDoc(quizSnippetDocRef)
      await deleteDoc(topicDocRef)

      // Remove the deleted topic from the cached lecture data
      const updatedLectureData = lectureData.filter(
        (topic) => topic.topicName !== topicName
      )
      setLectureData(updatedLectureData)

      console.log(`Topic '${topicName}' deleted successfully.`)
    } catch (error) {
      console.error('Error deleting topic:', error)
      // Handle error here
    }
    setIsLoading(false)
  }

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
          <Text>
            Number of learning objectives:
            {numOfLOs}
          </Text>
          <Text>
            Created at:
            {new Date(timeOfCreation.seconds * 1000).toLocaleDateString()}
          </Text>
          <Text>
            Due date:
            {new Date(dueDate.seconds * 1000).toLocaleDateString()}
          </Text>
          <Flex flexDirection="row" margin="1rem">
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

            <Button
              bg="#265e9e"
              color="white"
              _hover={{
                bg: 'white',
                color: '#265e9e',
                transform: 'scale(0.98)',
              }}
              isLoading={isLoading}
              onClick={() => deleteTopic(topicName)}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}
export default TopicBox
