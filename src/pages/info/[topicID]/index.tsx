import React, { useEffect, useRef, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import {
  Box,
  Heading,
  Tr,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  TableContainer,
  Text,
  Flex,
} from '@chakra-ui/react'
import { getAllUsers } from '../../api/UserData'
import PageContent from '@/src/components/layout/PageContent'
import BasicButton from '@/src/components/buttons/BasicButton'
import DownloadButton from '@/src/components/buttons/DownloadButton'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import DeleteButton from '@/src/components/buttons/DeleteButton'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
            (correctCount / history.results.length) *
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

  // Extract problem areas and count occurrences
  const problemAreasCount: { [key: string]: number } = studentResults.reduce(
    (acc: any, curr: any) => {
      curr.problemArea.forEach((area: any) => {
        acc[area] = (acc[area] || 0) + 1
      })
      return acc
    },
    {}
  )

  const problemAreasData = Object.keys(problemAreasCount).map((key) => ({
    problemArea: key,
    count: problemAreasCount[key],
  }))

  problemAreasData.sort((a, b) => b.count - a.count)

  const chartData = {
    labels: problemAreasData.map((data) => data.problemArea),
    datasets: [
      {
        label: 'Number of Students',
        data: problemAreasData.map((data) => data.count),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Student Problem Areas',
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
  }

  return (
    <>
      <PageContent>
        <Box m={2} p={5}>
          <Heading m={2} p={5}>
            Student Information for {name} Quiz
          </Heading>

          <BasicButton routeName={`/quiz/${name}`} buttonName="Back" />

          {quizHistory.length != 0 ? (
            <Box m={2}>
              <Flex alignItems="center" justifyContent='center'>
                <DownloadButton
                  filename={filename}
                  currentTableRef={tableRef.current}
                />
                <DeleteButton topicName={name} deleteType="deleteQuizHistory" />
              </Flex>

              <TableContainer overflowX="auto">
                <Table variant="simple" ref={tableRef}>
                  <Thead>
                    <Tr>
                      <Th>Student Email</Th>
                      <Th>Results %</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {studentResults.length !== 0 &&
                      studentResults.map((studentData, index) => (
                        <Tr key={studentData.email}>
                          <Td>{studentData.email}</Td>
                          <Td>{studentData.outcome}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Bar data={chartData} options={options} />

              <BasicButton routeName={`/quiz/${name}`} buttonName="Back" />
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
