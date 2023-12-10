import React, { useContext, useState } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import AddButton from '../buttons/AddButton'
import AddModal from './AddModal'
import { EditButton } from '../buttons/EditButton'


interface QuestionNodeProps {
  content: string
  id: string
  topicID: string
  level: number
}

const QuestionNode: React.FC<
  QuestionNodeProps & { onQuestionAdded: () => void }
> = ({ content, id, topicID, onQuestionAdded, level }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [questionAdded, setQuestionAdded] = useState(false)

  const handleQuestionAdded = () => {
    setQuestionAdded(true)
    onQuestionAdded()
    closeAddModal()
  }
  const openAddModal = () => {
    setIsModalOpen(true)
  }

  const closeAddModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div>
      <Box border="2px" padding={1} m={1}>
        <Flex flexDirection="column" alignItems="centre">
          <h1>{content}</h1>
          <h2>id {id}</h2>
          <h2>level {level}</h2>
          {questionAdded ? (
            <EditButton
              questionID={id}
              name={topicID}
              level={level}
            />
          ) : (
            <AddButton onClick={openAddModal} disabled={questionAdded} />
          )}
          <AddModal
            isOpen={isModalOpen}
            onClose={closeAddModal}
            onQuestionAdded={handleQuestionAdded}
            topicID={topicID}
            id={id}
            level={level}
          />
        </Flex>
      </Box>
    </div>
  )
}

export default QuestionNode
