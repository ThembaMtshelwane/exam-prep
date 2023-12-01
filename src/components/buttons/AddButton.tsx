import { useState } from 'react'
import { Button } from '@chakra-ui/react'

interface AddButtonProps {
  onClick: () => void // Function to open the modal
  disabled: boolean
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, disabled }) => {
  const [questionAdded, setQuestionAdded] = useState(false)

  return (
    <>
      <Button onClick={onClick} disabled={disabled}>
        Add
      </Button>
    </>
  )
}

export default AddButton
