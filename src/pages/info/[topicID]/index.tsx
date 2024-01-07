import React, { useEffect, useRef, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import {
  Box,
  Heading,
  Button,
  Link,
  Tr,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react'
import { DownloadTableExcel } from 'react-export-table-to-excel'

import { getAllUsers } from '../../api/UserData'
import PageContent from '@/src/components/layout/PageContent'
import BasicButton from '@/src/components/buttons/BasicButton'
import DownloadButton from '@/src/components/buttons/DownloadButton'

type StudentResult = {
  email: string
  outcome: string
  problemArea: string[]
}

type QuizPageProps = {
  userData: any[]
  name: string
  quizHistory: any[]
}

type HistoryEntry = {
  studentID: string
  results: { result: string; loText: string }[]
}

const QuizPage: React.FC<QuizPageProps> = ({ name, quizHistory }) => {
  const [studentResults, setStudentResults] = useState<StudentResult[]>([])
  const [filename, setFilename] = useState<string>(
    `${name} quiz - student info`
  )
  const [show, setShow] = useState<boolean>(false)
  const tableRef = useRef(null)

  useEffect(() => {
    if (quizHistory.length != 0) {
      const newStudentResults = quizHistory.map(
        (history: HistoryEntry, index: number) => {
          const correctCount = history.results.filter(
            (outcome: { result: string }) => outcome.result === 'correct'
          ).length
          const percentage = (
            (correctCount / (history.results.length - 1)) *
            100
          ).toFixed(2)
          const problemAreas = history.results.map((result) => result.loText)
          return {
            email: history.studentID,
            outcome: percentage,
            problemArea: problemAreas,
          }
        }
      )
      setStudentResults(newStudentResults)
      setShow(true)
    }
  }, [])

  console.log('problem areas', studentResults)

  return (
    <>
      <PageContent>
        <Box m={2} p={5}>
          <Heading m={2} p={5}>
            Student Information for {name} Quiz
          </Heading>

          <BasicButton routeName="/dashboard" buttonName="Back" />

          {quizHistory.length != 0 ? (
            <Box m={2}>
              <DownloadButton
                filename={filename}
                currentTableRef={tableRef.current}
              />

              <TableContainer>
                <Table variant="simple" ref={tableRef}>
                  <Thead>
                    <Tr>
                      <Th>Student Email</Th>
                      <Th>Results %</Th>
                      <Th>Problem Area/s</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {studentResults.length !== 0 &&
                      studentResults.map((studentData, index) => (
                        <Tr key={studentData.email}>
                          <Td>{studentData.email}</Td>
                          <Td>{studentData.outcome}</Td>
                          <Td>{studentData.problemArea.join(', ')}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <BasicButton routeName="/dashboard" buttonName="Back" />
            </Box>
          ) : (
            <Box>
              <Text>Data is not available. Students must answer the quiz</Text>
            </Box>
          )}
        </Box>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getAllUsers(context)
}

export default QuizPage
