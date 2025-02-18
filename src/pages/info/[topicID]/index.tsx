import React, { useEffect, useRef, useState, useMemo } from "react";
import { GetServerSidePropsContext } from "next";
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
} from "@chakra-ui/react";
import { getAllUsers } from "../../api/UserData";
import PageContent from "@/src/components/layout/PageContent";
import BasicButton from "@/src/components/buttons/BasicButton";
import DownloadButton from "@/src/components/buttons/DownloadButton";
import DeleteButton from "@/src/components/buttons/DeleteButton";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type StudentResult = {
  email: string;
  outcome: string;
  problemArea: string[];
};

type HistoryEntry = {
  studentID: string;
  results: { result: string; loText: string }[];
};

type QuizPageProps = {
  name: string;
  quizHistory: HistoryEntry[];
};

const QuizPage: React.FC<QuizPageProps> = ({ name, quizHistory }) => {
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [filename, setFilename] = useState(`${name} quiz - student info`);
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    if (quizHistory.length > 0) {
      const newStudentResults = quizHistory.map((history) => {
        const correctCount = history.results.filter(
          (outcome) => outcome.result === "correct"
        ).length;
        const percentage = (
          (correctCount / history.results.length) *
          100
        ).toFixed(2);
        return {
          email: history.studentID,
          outcome: percentage,
          problemArea: history.results
            .filter((result) => result.result !== "correct")
            .map((result) => result.loText),
        };
      });

      setStudentResults(newStudentResults);
    }
  }, [quizHistory]);

  // Extract problem areas and count occurrences
  const problemAreasCount: Record<string, number> = useMemo(() => {
    return studentResults.reduce((acc, curr) => {
      curr.problemArea.forEach((area) => {
        acc[area] = (acc[area] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
  }, [studentResults]);

  const problemAreasData = useMemo(
    () =>
      Object.entries(problemAreasCount)
        .map(([problemArea, count]) => ({ problemArea, count }))
        .sort((a, b) => b.count - a.count),
    [problemAreasCount]
  );

  const chartData = useMemo(
    () => ({
      labels: problemAreasData.map((data) => data.problemArea),
      datasets: [
        {
          label: "Number of Students",
          data: problemAreasData.map((data) => data.count),
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    }),
    [problemAreasData]
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Student Problem Areas" },
    },
    scales: {
      x: { ticks: { maxRotation: 0, minRotation: 0 } },
    },
  };

  return (
    <PageContent>
      <Box m={2} p={5}>
        <Heading m={2} p={5}>{`Student Information for ${name} Quiz`}</Heading>

        <BasicButton routeName={`/quiz/${name}`} buttonName="Back" />

        {quizHistory.length > 0 ? (
          <Box m={2}>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection={{ mdToXl: "column" }}
            >
              <DownloadButton
                filename={filename}
                studentResults={studentResults}
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
                  {studentResults.map((studentData) => (
                    <Tr key={studentData.email}>
                      <Td>{studentData.email}</Td>
                      <Td>{studentData.outcome}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Bar data={chartData} options={chartOptions} />

            <BasicButton routeName={`/quiz/${name}`} buttonName="Back" />
          </Box>
        ) : (
          <Box>
            <Text>Data is not available. Students must answer the quiz</Text>
          </Box>
        )}
      </Box>
    </PageContent>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getAllUsers(context);
}

export default QuizPage;
