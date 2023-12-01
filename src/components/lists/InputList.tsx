import React, { useState, ChangeEvent } from 'react'
import { Text, Input } from '@chakra-ui/react'
import CustomInput from '../input/CustomInput'

type InputListProps = { handleOptionsData: (options: string[]) => void }

const InputList: React.FC<InputListProps> = ({ handleOptionsData }) => {
  const [options, setOptions] = useState<string[]>(['', '', '', ''])
  const placeholders = ['A', 'B', 'C', 'D']

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
      <CustomInput
        name={'A'}
        handleInputFunction={handleOptionChange(0)}
        placeholder={placeholders[0]}
        isRequired={true}
      />
      <CustomInput
        name={'B'}
        handleInputFunction={handleOptionChange(1)}
        placeholder={placeholders[1]}
        isRequired={true}
      />
      <CustomInput
        name={'C'}
        handleInputFunction={handleOptionChange(2)}
        placeholder={placeholders[2]}
        isRequired={true}
      />
      <CustomInput
        name={'D'}
        handleInputFunction={handleOptionChange(3)}
        placeholder={placeholders[3]}
        isRequired={true}
      />
    </>
  )
}
export default InputList

type addResourcesProps = {
  handleResourcesData: (resourceList: string[]) => void
}

interface ResourceData {
  resource1: string
  resource2: string
  resource3: string
  resource4: string
}
export const AddResources: React.FC<addResourcesProps> = ({
  handleResourcesData,
}) => {
  const [numOfLOs, setNumOfLOs] = useState<number>(0)
  const [error, setError] = useState('')
  const MAX_RESOURCES: number = 4

  const [resources, setResources] = useState<ResourceData>({
    resource1: '',
    resource2: '',
    resource3: '',
    resource4: '',
  })
  const handleResourceChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedResources: ResourceData = { ...resources } // Explicitly define the type here
      const resourceKey = `resource${index + 1}` as keyof ResourceData // Use keyof to narrow the type
      updatedResources[resourceKey] = event.target.value
      setResources(updatedResources)

      const updatedResourceList: string[] = Object.values(updatedResources) // Update the resource list
      handleResourcesData(updatedResourceList) // Sending updated resources back to parent component
    }
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
                      handleInputFunction={handleResourceChange(0)}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 1 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={handleResourceChange(1)}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 2 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={handleResourceChange(2)}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 3 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={handleResourceChange(3)}
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
