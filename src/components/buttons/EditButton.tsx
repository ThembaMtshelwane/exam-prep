import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import EditModal from '../modal/preview/EditModal'

type editProps = {
  questionID: string
  name: string
  fileURL: any
}

export const EditButton: React.FC<editProps> = ({
  questionID,
  name,
  fileURL,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <EditModal
        qid={questionID}
        name={name}
        fileURL={fileURL}
        open={open}
        handleClose={() => setOpen(false)}
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
