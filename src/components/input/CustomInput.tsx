import { Input } from '@chakra-ui/react'

type customInputProps = {
  name: string
  handleInputFunction: any
  placeholder: string
  isRequired?: boolean
  value: string
}

const CustomInput: React.FC<customInputProps> = ({
  name,
  handleInputFunction,
  placeholder,
  isRequired,
  value,
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
          value={value}
        ></Input>
      ) : (
        <Input
          mt={2}
          size="sm"
          placeholder={placeholder}
          name={name}
          onChange={handleInputFunction}
          value={value}
        ></Input>
      )}
    </>
  )
}

export default CustomInput
