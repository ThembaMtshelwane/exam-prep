import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import { getQuestion } from '../../api/QuestionData'
import {
  Box,
  ListItem,
  Stack,
  List,
  Text,
  Heading,
  Button,
  Link,
  Image,
} from '@chakra-ui/react'
import PageContent from '@/src/components/layout/PageContent'

type QuizPageProps = {
  // All topic data=> questions, options...
  topicQuestionData: any[]
  name: string
}

const QuizPage: React.FC<QuizPageProps> = ({ topicQuestionData, name }) => {
  const [studentInfo, setStudentInfo] = useState<string>('')

  useEffect(() => {
    const handleName = () => {
      setStudentInfo(`/info/${name}`)
    }
    handleName()
  })

  return (
    <>
      <PageContent>
        {topicQuestionData.length != 0 ? (
          <Box m={2} p={5}>
            <Heading m={2} p={5}>
              The Preview of {name} Quiz
            </Heading>
            <h3>Course Code: {}</h3>
            <h3>Quiz name: {name}</h3>
            <h3>Number of questions: {}</h3>
            <h3>Created at: {}</h3>
            <h3>Number of Learning objectives: {}</h3>
            <h3>Learning Objectives: {}</h3>
            <br />
            <h3>Active till: {}</h3>
            <h3>Students completed: {}</h3>
            <h3>Total tries: {}</h3>
            <br />
            <Link href="/dashboard">
              <Button
                color="black"
                border="2px solid #265e9e"
                width="100%"
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: ' #618fd9',
                  color: 'white',
                }}
              >
                Back
              </Button>
            </Link>
            <br /> <br />
            <Link href={studentInfo}>
              <Button
                color="black"
                border="2px solid #265e9e"
                width="100%"
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: ' #618fd9',
                  color: 'white',
                }}
              >
                Student Information
              </Button>
            </Link>
            <List width="100%">
              <Stack spacing={5}>
                {topicQuestionData.map((prevID: any, index: number) => (
                  <ListItem
                    key={index}
                    boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)"
                    m={2}
                    p={5}
                  >
                    <Text>Question ID: {prevID.questionID}</Text>
                    <Image src={prevID.fileURL} alt="" />
                    <Text>Question: {prevID.question}</Text>
                    <Text>Answer: {prevID.questionAnswer}</Text>
                    <Text>Options:</Text>
                    {
                      <List width="100%" spacing={2}>
                        {prevID.questionOptions.map(
                          (option: any, index: number) => (
                            <ListItem
                              key={index}
                              border="2px solid #265e9e"
                              width="50%"
                            >
                              <Text align="center">{option}</Text>
                            </ListItem>
                          )
                        )}
                      </List>
                    }

                    {prevID.questionResources.length != 0 ? (
                      <>
                        <Text>Resources:</Text>
                        <List width="100%" spacing={2}>
                          {prevID.questionResources.map(
                            (option: any, index: number) => (
                              <ListItem
                                key={index}
                                border="2px solid #265e9e"
                                width="50%"
                              >
                                <Text align="center">{option}</Text>
                              </ListItem>
                            )
                          )}
                        </List>
                      </>
                    ) : (
                      ''
                    )}
                  </ListItem>
                ))}
              </Stack>
            </List>
          </Box>
        ) : (
          <Box m={2} p={5}>
            <Heading m={2} p={5}>
              The Preview of {name} Quiz
            </Heading>
            <Text>No Questions to Preview</Text>
          </Box>
        )}
        <Link href="/dashboard">
          <Button
            color="black"
            border="2px solid #265e9e"
            width="100%"
            _active={{
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              bg: ' #618fd9',
              color: 'white',
            }}
          >
            Back
          </Button>
        </Link>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getQuestion(context)
}

export default QuizPage
