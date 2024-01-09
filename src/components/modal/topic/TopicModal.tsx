import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useRouter } from 'next/router'

// create
type TopicModalProps = {
  open: boolean
  handleClose: () => void
}
let module_Name = ''
let topic_Name = ''

const TopicModal: React.FC<TopicModalProps> = ({ open, handleClose }) => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [topicName, setTopicName] = useState('')
  const [module, setModule] = useState('')
  const [numOfLOs, setNumOfLOs] = useState(4)
  const [error, setError] = useState('')
  const [numLoError, setNumLoError] = useState('')
  const [LOList, setLOList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isValidQuiz, setIsValidQuiz] = useState(false)
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [dateError, setDateError] = useState('')

  const MIN_LEARNING_OBJECTIVES = 4
  const MAX_LEARNING_OBJECTIVES = 8

  const handleTopicName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setTopicName(value)

    if (value.length < 3 || value.length > 20) {
      setError('Topic name should be between 3 and 20 characters')
      setIsValidQuiz(false)
    } else if (/\s/.test(value)) {
      setError('Topic name should not contain spaces')
      setIsValidQuiz(false)
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      setError('Topic name should only contain letters')
      setIsValidQuiz(false)
    } else {
      setError('')
      setIsValidQuiz(true)
    }
    topic_Name = topicName
  }

  const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setModule(value)
    module_Name = module
  }

  const handleNumOfLOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!/^[0-9]+$/.test(value)) {
      setNumLoError('Enter a number')
      setIsValidQuiz(false)
      setNumOfLOs(0)
    } else if (
      Number(value) > MAX_LEARNING_OBJECTIVES ||
      Number(value) < MIN_LEARNING_OBJECTIVES
    ) {
      setNumLoError(' Minimum of 4 and maximum of 8')
      setNumOfLOs(0)
    } else {
      setNumOfLOs(Number(value))
      setNumLoError('')
      setIsValidQuiz(true)
    }
  }

  const handleLOList = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLOList((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  // const handleDueDateChange = (date: Date | null) => {
  //   if (!date) {
  //     setDateError('Please select a due date')
  //     setDueDate(null)
  //     setIsValidQuiz(false)
  //   } else {
  //     setDueDate(date)
  //     setDateError('')
  //     setIsValidQuiz(true)
  //   }
  // }

  const handleCreateQuiz = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      //Create the quiz document in firestore
      // - check if unique
      const topicsDocRef = doc(firestore, 'topics', topicName)

      await runTransaction(firestore, async (transaction) => {
        const topicDoc = await transaction.get(topicsDocRef)
        if (topicDoc.exists()) {
          throw new Error('Sorry, topic name is already taken. Try another.')
        }

        const quizInfo = {
          creatorID: user?.email, //creator's ID= user ID
          courseCode: module,
          createdAt: serverTimestamp(),
          // dueDate: dueDate,
          topicID: topicName,
          numberOfLearningObjectives: numOfLOs,
          listOFLearningObjectives: LOList,
        }

        //- if valid create quiz
        transaction.set(topicsDocRef, quizInfo)

        // create quiz snippet for the user=lecture
        transaction.set(
          doc(firestore, `lecturers/${user?.uid}/quizSnippets`, topicName),
          quizInfo
        )
        router.push(`topics/${topicName}`)
      })
    } catch (error: any) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            padding={3}
            textAlign="center"
            mt={5}
            mb={0}
          >
            Create a new quiz
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection="column"
              padding="10px 0px"
              justifyContent="center"
              pb={6}
            >
              <form onSubmit={handleCreateQuiz}>
                <Text fontWeight={600} fontSize={15}>
                  Course code:
                </Text>
                <Input
                  required
                  value={module}
                  placeholder="ELEN1234A"
                  size="sm"
                  mb={5}
                  onChange={handleModuleChange}
                />

                <Text fontWeight={600} fontSize={15}>
                  Topic Name:
                </Text>
                <Input
                  value={topicName}
                  placeholder="GeneralKnowledge"
                  size="sm"
                  onChange={handleTopicName}
                  required
                ></Input>

                <Text fontSize="10pt" color="red" mb={3}>
                  {error}
                </Text>

                {/* <Text fontWeight={600} fontSize={15} mt={3}>
                  Due Date:
                </Text>
                <Text fontSize="10pt" color="red" mb={3}>
                  {dateError}
                </Text>
                <Input
                  type="date"
                  value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                  size="sm"
                  onChange={(e) =>
                    handleDueDateChange(new Date(e.target.value))
                  }
                  required
                /> */}

                <Text fontWeight={600} fontSize={15} mt={3}>
                  Number of Learning Objectives:
                </Text>
                <Text fontSize="10pt" color="red" mb={3}>
                  {numLoError}
                </Text>
                <Input
                  value={numOfLOs}
                  size="sm"
                  name="numOfLOs"
                  onChange={handleNumOfLOs}
                  required
                />
                <Text fontWeight={600} fontSize={15} mt={3} color="#265e9e">
                  Expected number of questions: {2 * numOfLOs - 1}
                </Text>
                <Flex flexDirection="column">
                  {numOfLOs < MIN_LEARNING_OBJECTIVES &&
                  numOfLOs > MAX_LEARNING_OBJECTIVES
                    ? 'Invalid Leaning Objectives'
                    : Array(+numOfLOs)
                        .fill('')
                        .map((n, i) => {
                          return (
                            <div key={i * 7}>
                              <Input
                                mt={2}
                                size="sm"
                                placeholder={String(i + 1)}
                                name={String(i + 1)}
                                onChange={handleLOList}
                                required
                              ></Input>
                            </div>
                          )
                        })}
                  {isValidQuiz && (
                    <Button
                      bg="#265e9e"
                      color="white"
                      margin="2px"
                      type="submit"
                      width="50%"
                      isLoading={loading}
                    >
                      Continue
                    </Button>
                  )}
                </Flex>
              </form>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}

export { module_Name, topic_Name }

export default TopicModal
