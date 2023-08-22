import React, { useEffect, useRef, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
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
} from '@chakra-ui/react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

import { getAllUsers } from '../../api/UserData';
import PageContent from '@/src/components/layout/PageContent';

type StudentResult = {
  email: string;
  outcome: string;
};

type QuizPageProps = {
  userData: any[];
  name: string;
  quizHistory: any[];
};

type HistoryEntry = {
  studentID: string;
  results: { result: string }[];
};

const QuizPage: React.FC<QuizPageProps> = ({name, quizHistory }) => {
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [filename, setFilename] = useState<string>(`${name} quiz - student info`);
  const [show, setShow] = useState<boolean>(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const newStudentResults = quizHistory.map((history: HistoryEntry) => {
      const correctCount = history.results.filter(
        (outcome: { result: string }) => outcome.result === 'correct'
      ).length;
      const percentage = ((correctCount / (history.results.length - 1)) * 100).toFixed(2);
      return { email: history.studentID, outcome: percentage };
    });
    setStudentResults(newStudentResults);
    setShow(true);
  }, []);

  return (
    <>
      <PageContent>
        <Box m={2} p={5}>
          <Heading m={2} p={5}>Student Information for {name} Quiz</Heading>

          <Link href="/dashboard">
            <Button
              color="black"
              border="2px solid #265e9e"
              width="100%"
              _active={{
                transform: 'scale(0.98)',
              }}
              _focus={{
                boxShadow: '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                bg: ' #618fd9',
                color: 'white',
              }}
            >
              Back
            </Button>
          </Link>

          <Box m={2}>
            <DownloadTableExcel
              filename={filename}
              sheet="students"
              currentTableRef={tableRef.current}
            >
              <Button
                color="black"
                border="2px solid #265e9e"
                width="100%"
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow: '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: ' #618fd9',
                  color: 'white',
                }}
              >
                Download Data
              </Button>
            </DownloadTableExcel>

            <TableContainer>
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

            <Link href="/dashboard">
              <Button
                color="black"
                border="2px solid #265e9e"
                width="100%"
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow: '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: ' #618fd9',
                  color: 'white',
                }}
              >
                Back
              </Button>
            </Link>
          </Box>
        </Box>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getAllUsers(context);
}

export default QuizPage;
