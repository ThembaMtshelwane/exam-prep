import { Input } from '@chakra-ui/react'

type customInputProps = {
  name: string
  handleInputFunction: any
  placeholder: string
  isRequired: boolean
}

const CustomInput: React.FC<customInputProps> = ({
  name,
  handleInputFunction,
  placeholder,
  isRequired,
}) => {
  return (
    <>
      {isRequired ? (
        <Input
          mt={2}
          size="sm"
          placeholder={placeholder}
          required
          name={name}
          onChange={handleInputFunction}
        ></Input>
      ) : (
        <Input
          mt={2}
          size="sm"
          placeholder={placeholder}
          name={name}
          onChange={handleInputFunction}
        ></Input>
      )}
    </>
  )
}

export default CustomInput
