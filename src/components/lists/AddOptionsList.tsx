import React, { useState, ChangeEvent, useEffect } from 'react'
import { Text, Input } from '@chakra-ui/react'
import CustomInput from '../input/CustomInput'

type addOptionsListProps = {
  handleOptionsData: (options: string[]) => void
  initialOptions: string[]
}

export const AddOptionsList: React.FC<addOptionsListProps> = ({
  handleOptionsData,
  initialOptions,
}) => {
  const [options, setOptions] = useState<string[]>(['', '', '', '', ''])
  const placeholders = ['A', 'B', 'C', 'D', 'E']
  const numberOfOptions = 5

  useEffect(() => {
    setOptions(initialOptions.slice(0, numberOfOptions)) // Assuming initialOptions has a length of 4 or more
  }, [initialOptions])

  const handleOptionChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedOptions = [...options]
      updatedOptions[index] = event.target.value
      setOptions(updatedOptions)
      handleOptionsData(updatedOptions) // Sending updated options back to parent component
    }

  return (
    <>
      <Text fontWeight={600} fontSize={15}>
        Options
      </Text>
      {options.map((_, index) => (
        <CustomInput
          key={index}
          name={`option-${index}`}
          handleInputFunction={handleOptionChange(index)}
          placeholder={placeholders[index]}
          value={options[index]}
          isRequired={true}
        />
      ))}
    </>
  )
}
