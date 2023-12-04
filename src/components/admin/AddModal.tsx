import CustomModal from '../input/CustomModal'

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
  onQuestionAdded: () => void // Callback function to inform QuestionNode
  topicID: string
  id: string
  level: number
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  onQuestionAdded,
  topicID,
  id,
  level,
}) => {
  return (
    <CustomModal
      title={'Add Question'}
      onQuestionAdded={onQuestionAdded}
      isOpen={isOpen}
      onClose={onClose}
      topicID={topicID}
      id={id}
      level={level}
    />
  )
}

export default AddModal
