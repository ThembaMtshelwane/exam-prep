import React from 'react'

import CustomModal from '../../input/CustomModal'

type EditModalProps = {
  qid: string
  name: string
  open: boolean
  handleClose: () => void
  level: number
  questionPreview: any
  updateQuestionPreview: (updatedData: any) => void
  updateImageDataInPreview: (newImageData: string) => void
}

const EditModal: React.FC<EditModalProps> = ({
  qid,
  name,
  open,
  handleClose,
  level,
  questionPreview,
  updateQuestionPreview,
  updateImageDataInPreview,
}) => {
  return (
    <CustomModal
      title={'Edit Question'}
      isOpen={open}
      onClose={handleClose}
      topicID={name}
      id={qid}
      level={level}
      questionPreview={questionPreview}
      updateQuestionPreview={updateQuestionPreview}
    />
  )
}

export default EditModal
