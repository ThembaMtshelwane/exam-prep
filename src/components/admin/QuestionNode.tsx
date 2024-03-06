import React, { useEffect, useState } from 'react'
import { Flex, Box } from '@chakra-ui/react'
// import AddButton from '../buttons/AddButton'
// import AddModal from './AddModal'
import { EditButton } from '../buttons/EditButton'
import { firestore } from '@/src/firebase/clientApp'
import { setDoc } from '@firebase/firestore'
import { doc, serverTimestamp } from 'firebase/firestore'

interface QuestionNodeProps {
  content: string
  id: string
  topicID: string
  level: number
}

type FormData = {
  questionLearningObjectives: string
  question: string
  fileURL: string
  questionAnswer: string
  questionOptions: string[]
  questionResources: string[]
  questionID: string
  questionLevel: number
  timestamp: any
}

const QuestionNode: React.FC<
  QuestionNodeProps & { onQuestionAdded: () => void }
> = ({ content, id, topicID, onQuestionAdded, level }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [questionAdded, setQuestionAdded] = useState(false)
  const [formData, setFormData] = useState({
    questionLearningObjectives: '',
    question: '',
    fileURL: null,
    questionAnswer: '',
    questionOptions: ['', '', '', '', ''],
    questionResources: [],
    questionID: id,
    questionLevel: level,
    timestamp: null,
  })

  useEffect(() => {
    async function createDefault() {
      try {
        await setDoc(doc(firestore, `topics/${topicID}/questions/${id}/`), {
          ...formData,
          timestamp: serverTimestamp(),
        })
      } catch (err) {
        console.error('Error submitting form:', err)
      }
    }
    createDefault()
  }, [formData])

  // const handleQuestionAdded = () => {
  //   setQuestionAdded(true)
  //   onQuestionAdded()
  //   closeAddModal()
  // }
  // const openAddModal = () => {
  //   setIsModalOpen(true)
  // }

  // const closeAddModal = () => {
  //   setIsModalOpen(false)
  // }

  return (
    <div>
      <Box border="2px" padding={1} m={1}>
        <Flex flexDirection="column" alignItems="centre">
          <h1>{content}</h1>
          <h2>id {id}</h2>
          <h2>level {level}</h2>
          {questionAdded ? (
            <EditButton questionID={id} name={topicID} level={level} />
          ) : (
            // <AddButton onClick={openAddModal} disabled={questionAdded} />
            ''
          )}
          {/* Replace with edit modal */}
          <EditButton questionID={id} name={topicID} level={level} />
          {/* <AddModal
            isOpen={isModalOpen}
            onClose={closeAddModal}
            onQuestionAdded={handleQuestionAdded}
            topicID={topicID}
            id={id}
            level={level}
          /> */}
        </Flex>
      </Box>
    </div>
  )
}

export default QuestionNode
