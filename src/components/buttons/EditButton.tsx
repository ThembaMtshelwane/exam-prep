import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from '../modal/preview/EditModal'

type editProps = {
  questionID: string
  name: string
  level: number
  questionPreview?: any
  updateQuestionPreview?: (updatedData: any) => void
}

export const EditButton: React.FC<editProps> = ({
  questionID,
  name,
  level,
  questionPreview,
  updateQuestionPreview,
}) => {
  const [open, setOpen] = useState(false)

  console.log('id in edit button', questionID)

  return (
    <>
      <EditModal
        qid={questionID}
        name={name}
        open={open}
        handleClose={() => setOpen(false)}
        level={level}
        questionPreview={questionPreview}
        updateQuestionPreview={updateQuestionPreview}
      />
      <Button
        fontSize={20}
        mr={2}
        cursor="pointer"
        onClick={() => setOpen(true)}
        alignSelf="center"
      >
        Edit
      </Button>
    </>
  )
}
