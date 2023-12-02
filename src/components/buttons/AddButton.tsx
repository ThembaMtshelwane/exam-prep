import { Button } from '@chakra-ui/react'

interface AddButtonProps {
  onClick: () => void // Function to open the modal
  disabled: boolean
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, disabled }) => {

  return (
    <>
      <Button onClick={onClick} disabled={disabled}>
        Add
      </Button>
    </>
  )
}

export default AddButton
