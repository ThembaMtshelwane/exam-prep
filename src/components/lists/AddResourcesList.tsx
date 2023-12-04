import { Input, Text } from '@chakra-ui/react'
import { useState, ChangeEvent } from 'react'
import CustomInput from '../input/CustomInput'

type addResourcesListProps = {
  handleResourcesData: (resourceList: string[]) => void
  value: string
}

interface ResourceData {
  [key: string]: string
}
export const AddResourcesList: React.FC<addResourcesListProps> = ({
  handleResourcesData,
  value,
}) => {
  const [numOfResources, setNumOfResources] = useState<number>(0)
  const [error, setError] = useState('')
  const MAX_RESOURCES: number = 4

  const [resources, setResources] = useState<ResourceData>({
    resource1: '',
    resource2: '',
    resource3: '',
    resource4: '',
  })
  const handleResourceChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedResources = { ...resources, [key]: event.target.value }
      setResources(updatedResources)

      const updatedResourceList = Object.values(updatedResources)
      handleResourcesData(updatedResourceList) // Sending updated resources back to parent component
    }

  const handleNumOfResources = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const num = Number(event.target.value)
    setNumOfResources(num)

    if (num > MAX_RESOURCES) {
      setError(`Resources must be a max of ${MAX_RESOURCES}`)
      return
    }
  }
  return (
    <>
      <Text>Number of Resources</Text>
      <Input
        value={numOfResources}
        size="sm"
        name="numOfResources"
        onChange={handleNumOfResources}
        required
      ></Input>

      {Array.from({ length: numOfResources }, (_, index) => index + 1).map(
        (resourceNumber) => (
          <CustomInput
            key={resourceNumber}
            name={`resource${resourceNumber}`}
            handleInputFunction={handleResourceChange(
              `resource${resourceNumber}`
            )}
            placeholder={`Link-${resourceNumber}`}
            isRequired={true}
            value={value}
          />
        )
      )}
      <Text color="red">{error}</Text>
    </>
  )
}
