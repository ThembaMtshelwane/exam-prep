import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import AddQuizIcon from "./AddQuiz";
import TopicBox from "./TopicBox";
import { useLectureDataContext } from "./LectureDataProvider";

const AdminPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { lectureData } = useLectureDataContext();

  return (
    <>
      {/* Welcome the lecturer */}
      <Heading p="5">Welcome {user?.email ?? "Lecturer"}</Heading>

      <AddQuizIcon />

      <Flex align="center" justify="center" flexDirection="column" m={2} p={5}>
        <List width="100%">
          {lectureData.length ? (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)", // 1 column for mobile
                sm: "repeat(2, 1fr)", // 2 columns for small screens
                md: "repeat(3, 1fr)", // 3 columns for medium screens
                lg: "repeat(4, 1fr)", // 4 columns for large screens
              }}
              gap={6} // Add space between items
              p={4}
            >
              {lectureData.map((prevID: any, index: number) => {
                const {
                  topicID,
                  courseCode,
                  numberOfLearningObjectives,
                  createdAt,
                  dueDate,
                } = prevID;

                return (
                  <GridItem key={index}>
                    <TopicBox
                      topicURL={`quiz/${topicID}`}
                      topicName={topicID}
                      courseCode={courseCode}
                      numOfLOs={numberOfLearningObjectives}
                      timeOfCreation={createdAt}
                      dueDate={dueDate}
                    />
                  </GridItem>
                );
              })}
            </Grid>
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
        </List>
        <br />
      </Flex>
    </>
  );
};

export default AdminPage;
