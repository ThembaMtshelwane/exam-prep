import React, { ChangeEvent, useState } from 'react'
import { Input, Text } from '@chakra-ui/react'

type UserTextInputProps = {
  handleTextInputData: (text: string) => void
  textLabel: string
}
const UserTextInput: React.FC<UserTextInputProps> = ({
  handleTextInputData,
  textLabel,
}) => {
  const [textData, setTextData] = useState<string>('')

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedText = event.target.value
    setTextData(updatedText)
    handleTextInputData(updatedText) // Sending updated text back to parent component
  }

  return (
    <div>
      <Text fontWeight={600} fontSize={15}>
        {textLabel}
        <Input name={textLabel} required onChange={handleText} />
      </Text>
    </div>
  )
}
export default UserTextInput
