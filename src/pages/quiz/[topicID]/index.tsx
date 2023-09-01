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
import EditModal from '@/src/components/modal/preview/EditModal'

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
            <StudentInformationButton studentInfo={studentInfo} />
            <br />
            <br />
            <BackToDashboard />
            <br />
            <List width="100%">
              <Stack spacing={5}>
                {topicQuestionData.map((data: any, index: number) => (
                  <ListItem key={index}>
                    <PreviewCard questionPreview={data} name={name} />
                  </ListItem>
                ))}
              </Stack>
            </List>
          </Box>
        ) : (
          <NoData name={name} />
        )}
        <BackToDashboard />
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getQuestion(context)
}

export default QuizPage

type optionsProps = {
  options: any
}

const DisplayOptions: React.FC<optionsProps> = ({ options }) => {
  return (
    <List width="100%" spacing={2}>
      {options.map((option: any, index: number) => (
        <ListItem key={index} border="2px solid #265e9e" width="50%">
          <Text align="center">{option}</Text>
        </ListItem>
      ))}
    </List>
  )
}

type resourcesProps = {
  resources: any
}

const DisplayResources: React.FC<resourcesProps> = ({ resources }) => {
  return (
    <>
      {resources.length != 0 ? (
        <>
          <Text>Resources:</Text>
          <List width="100%" spacing={2}>
            {resources.map((option: any, index: number) => (
              <ListItem key={index} border="2px solid #265e9e" width="50%">
                <Text align="center">{option}</Text>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        ''
      )}
    </>
  )
}

type noDataProps = {
  name: string
}

const NoData: React.FC<noDataProps> = ({ name }) => {
  return (
    <Box m={2} p={5}>
      <Heading m={2} p={5}>
        The Preview of {name} Quiz
      </Heading>
      <Text>No Questions to Preview</Text>
    </Box>
  )
}

type indexProps = {}

const BackToDashboard: React.FC<indexProps> = () => {
  return (
    <div>
      {' '}
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
    </div>
  )
}

type studentInfo = {
  studentInfo: any
}

const StudentInformationButton: React.FC<studentInfo> = ({ studentInfo }) => {
  return (
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
  )
}

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
      <Image src={fileURL} alt="" />
      <Text>Question: {question}</Text>
      <Text>Answer: {questionAnswer}</Text>
      <Text>Options:</Text>
      <DisplayOptions options={questionOptions} />
      <DisplayResources resources={questionResources} />
      <br />
      <EditButton questionID={questionID} name={name} />
    </Box>
  )
}

type editProps = {
  questionID: string
  name: string
}

const EditButton: React.FC<editProps> = ({ questionID, name }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <EditModal
        qid={questionID}
        name={name}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <Button
        fontSize={20}
        mr={2}
        cursor="pointer"
        onClick={() => setOpen(true)}
        alignSelf="center"
      >
        Edit
      </Button>
    </>
  )
}

type saveProps = {}

const SaveButton: React.FC<saveProps> = () => {
  return (
    <>
      <Button>Save</Button>
    </>
  )
}
