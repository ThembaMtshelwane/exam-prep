import React, { useState } from 'react'
import { Button, Flex, Box } from '@chakra-ui/react'
import AddButton from '../buttons/AddButton'
import AddModal from '../modal/preview/AddModal'

interface QuestionNodeProps {
  content: string
  id: string
  topicID: string
}

const QuestionNode: React.FC<
  QuestionNodeProps & { onQuestionAdded: () => void }
> = ({ content, id, topicID, onQuestionAdded }) => {
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
          {questionAdded ? (
            <Button variant="ghost" disabled>
              Question Added
            </Button>
          ) : (
            <AddButton onClick={openAddModal} disabled={questionAdded} />
          )}
          <AddModal
            isOpen={isModalOpen}
            onClose={closeAddModal}
            onQuestionAdded={handleQuestionAdded}
            topicID={topicID}
            id={id}
          />
        </Flex>
      </Box>
    </div>
  )
}

export default QuestionNode
