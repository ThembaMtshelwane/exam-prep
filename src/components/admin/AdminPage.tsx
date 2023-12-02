import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'
import React, { useState } from 'react'
import TopicModal from '../modal/topic/TopicModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/src/firebase/clientApp'
import { getLectureData } from '../../pages/api/LectureData'

type AdminPageProps = {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const [open, setOpen] = useState(false)
  const [user] = useAuthState(auth)

  const [loading, setLoading] = useState(false)
  const [showList, setList] = useState(true)
  const [lectureData, setLectureData] = useState<any[]>([])

  const fetchLectureData = async () => {
    setLoading(true)
    const data = await getLectureData(user?.uid)
    setLectureData(data?.props.lectureInfo)
    setLoading(false)
    setList(false)
  }

  console.log('lectureData', lectureData)

  return (
    <>
      {/* Welcome the lecturer */}
      <Heading p={5}> Welcome {user?.email}. </Heading>

      <TopicModal open={open} handleClose={() => setOpen(false)} />

      <Flex align="center" justify="center" mt={5} fontWeight={600}>
        {/* // Add Quiz Button*/}
        <Icon
          fontSize={20}
          mr={2}
          as={GrAdd}
          cursor="pointer"
          onClick={() => setOpen(true)}
          alignSelf="center"
        />
        <Text fontSize={15}>Add Quiz</Text>
      </Flex>

      <Flex align="center" justify="center" mt={5} fontWeight={600}>
        {showList ? (
          <Button
            m={2}
            p={5}
            cursor="pointer"
            isLoading={loading}
            onClick={fetchLectureData}
          >
            <Text> Show Your Quizzes</Text>
          </Button>
        ) : (
          <Box m={2} p={5} boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)">
            <Flex
              align="center"
              justify="center"
              flexDirection="column"
              mt="20px"
            >
              <Text fontWeight={600} fontSize={20}>
                Previously Made Quizzes
              </Text>

              <List width="100%">
                {
                  <Stack spacing={2}>
                    {lectureData.length != 0 ? (
                      lectureData.map((prevID: any, index: number) => (
                        <ListItem key={index}>
                          <a href={`quiz/${prevID.topicID}`}>
                            <Button
                              fontWeight={700}
                              bg="white"
                              boxShadow="1px 1px 1px 2px rgba(97, 143, 217, .75)"
                              p="10px"
                              _hover={{
                                bg: '#265e9e',
                                color: 'white',
                                transform: 'scale(0.98)',
                              }}
                              isLoading={loading}
                              width="95%"
                              height="50%"
                              borderRadius={0}
                            >
                              <Flex direction="column">
                                <Text>Topic: {prevID.topicID}</Text>
                                <Text>Course Code: {prevID.courseCode}</Text>
                                <Text>
                                  Number of learning objectives:{' '}
                                  {prevID.numberOfLearningObjectives}
                                </Text>
                                <Text>
                                  Created at:{' '}
                                  {new Date(
                                    prevID.createdAt.seconds * 1000
                                  ).toLocaleDateString()}
                                </Text>
                              </Flex>
                            </Button>
                          </a>
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
        )}
      </Flex>
    </>
  )
}
export default AdminPage
