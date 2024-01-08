import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/src/firebase/clientApp'
import AddQuizIcon from './AddQuiz'
import TopicBox from './TopicBox'
import { useLectureDataContext } from './LectureDataProvider'

type AdminPageProps = {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const [user] = useAuthState(auth)

  const { lectureData } = useLectureDataContext()

  return (
    <>
      {/* Welcome the lecturer */}
      <Heading p={5}> Welcome {user?.email}. </Heading>

      <AddQuizIcon />

      <Flex align="center" justify="center" mt={5} fontWeight={600}>
        <Box m={2} p={5} boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)">
          <Flex
            align="center"
            justify="center"
            flexDirection="column"
            mt="20px"
          >
            {/* <Text fontWeight={600} fontSize={20}>
              Previously Made Quizzes
            </Text> */}

            <List width="100%">
              {
                <Stack spacing={2}>
                  {lectureData.length != 0 ? (
                    lectureData.map((prevID: any, index: number) => (
                      <ListItem key={index}>
                        <TopicBox
                          topicURL={`quiz/${prevID.topicID}`}
                          topicName={prevID.topicID}
                          courseCode={prevID.courseCode}
                          numOfLOs={prevID.numberOfLearningObjectives}
                          timeOfCreation={prevID.createdAt}
                          dueDate={prevID.dueDate}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      m={2}
                      p={2}
                    >
                      <Text>No Available Quiz</Text>
                    </Flex>
                  )}
                </Stack>
              }
            </List>
            <br />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
export default AdminPage
