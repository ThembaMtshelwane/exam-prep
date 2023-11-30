import React, { useState } from 'react'
import { Text, Input } from '@chakra-ui/react'
import CustomInput from '../input/CustomInput'

type InputListProps = {
  listName: string
  hfunctions: any[]
  placeholders: string[]
}

const InputList: React.FC<InputListProps> = ({
  listName,
  hfunctions,
  placeholders,
}) => {
  return (
    <>
      <Text fontWeight={600} fontSize={15}>
        {listName}
      </Text>
      <CustomInput
        name={'A'}
        handleInputFunction={hfunctions[0]}
        placeholder={placeholders[0]}
        isRequired={true}
      />
      <CustomInput
        name={'B'}
        handleInputFunction={hfunctions[1]}
        placeholder={placeholders[1]}
        isRequired={true}
      />
      <CustomInput
        name={'C'}
        handleInputFunction={hfunctions[2]}
        placeholder={placeholders[2]}
        isRequired={true}
      />
      <CustomInput
        name={'D'}
        handleInputFunction={hfunctions[3]}
        placeholder={placeholders[3]}
        isRequired={true}
      />
    </>
  )
}
export default InputList

type addResourcesProps = {
  hfunctions: any[]
}

export const AddResources: React.FC<addResourcesProps> = ({ hfunctions }) => {
  const [numOfLOs, setNumOfLOs] = useState<number>(0)
  const [error, setError] = useState('')
  const MAX_RESOURCES: number = 4

  const handleNumOfResources = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNumOfLOs(Number(event.target.value))

    if (Number(event.target.value) > MAX_RESOURCES) {
      setError(`Resources must be a max of ${MAX_RESOURCES}`)
      return
    }
  }
  return (
    <>
      <Text>Number of Resources</Text>
      <Input
        value={numOfLOs}
        size="sm"
        name="numOfLOs"
        onChange={handleNumOfResources}
        required
      ></Input>

      {numOfLOs <= 4 ? (
        <>
          {Array(+Number(numOfLOs))
            .fill('')
            .map((n, i) => {
              return (
                <div key={i}>
                  {i == 0 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={hfunctions[0]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 1 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={hfunctions[1]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 2 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={hfunctions[2]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 3 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={hfunctions[3]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
        </>
      ) : (
        <Text color="red">{error}</Text>
      )}
    </>
  )
}
