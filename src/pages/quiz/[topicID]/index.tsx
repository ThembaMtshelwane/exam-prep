import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import { getQuestion } from '../../api/QuestionData'
import { Box, ListItem, Stack, List, Heading } from '@chakra-ui/react'
import PageContent from '@/src/components/layout/PageContent'
import BasicButton from '@/src/components/buttons/BasicButton'
import PreviewCard from '@/src/components/modal/preview/PreviewCard'
import NoData from '@/src/components/texts/NoData'
import { useLectureDataContext } from '@/src/components/admin/LectureDataProvider'

type QuizPageProps = {
  topicQuestionData: any[]
  name: string
}
const QuizPage: React.FC<QuizPageProps> = ({ topicQuestionData, name }) => {
  const [studentInfo, setStudentInfo] = useState<string>('')
  // const { lectureData } = useLectureDataContext()
  // const numOfLOs = lectureData[0].numOfLOs

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
            {/* <h3>Quiz name: {name}</h3> */}

            <BasicButton
              routeName={studentInfo}
              buttonName={'Student Information'}
            />
            <BasicButton routeName={'/dashboard'} buttonName={'Back'} />

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
        <BasicButton routeName={'/dashboard'} buttonName={'Back'} />
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getQuestion(context)
}

export default QuizPage
