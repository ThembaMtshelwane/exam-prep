import React from 'react'
import { Input } from '@chakra-ui/react'

type UserTextInputProps = {
  handleTextInputData: (text: string) => void
  textLabel: string
  value: string // Add value prop
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Add handleChange prop
  name: string
}
const UserTextInput: React.FC<UserTextInputProps> = ({
  handleTextInputData,
  textLabel,
  value,
  handleChange,
  name,
}) => {
  return (
    <div>
      <label>{textLabel}</label>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={(e) => handleTextInputData(e.target.value)}
        name={name}
      />
    </div>
  )
}
export default UserTextInput
