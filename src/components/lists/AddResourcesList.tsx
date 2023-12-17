import { Input, Text } from '@chakra-ui/react'
import { useState, ChangeEvent } from 'react'
import CustomInput from '../input/CustomInput'

type addResourcesListProps = {
  handleResourcesData: (resourceList: string[]) => void
  value: string[]
  num: number
}

interface ResourceData {
  [key: string]: string
}
export const AddResourcesList: React.FC<addResourcesListProps> = ({
  handleResourcesData,
  value,
  num,
}) => {
  const [numOfResources, setNumOfResources] = useState<number>(num)
  const [error, setError] = useState('')
  const MAX_RESOURCES: number = 4

  const [resources, setResources] = useState<ResourceData>({
    resource1: '',
    resource2: '',
    resource3: '',
    resource4: '',
  })
  // const [resources, setResources] = useState<string[]>(
  //   Array.from({ length: num }, () => '')
  // )
  const handleResourceChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const updatedResources = { ...resources, [key]: event.target.value }
      setResources(updatedResources)
      // handleResourcesData(updatedResources)
      const updatedResourceList = Object.values(updatedResources)
      handleResourcesData(updatedResourceList) // Sending updated resources back to parent component
    }

  const handleNumOfResources = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const value = event.target.value
    if (!/^[0-9]+$/.test(value)) {
      setError('Enter a number')
      setNumOfResources(0)
    } else {
      setNumOfResources(Number(value))
      setError('')
    }

    if (Number(value) > MAX_RESOURCES) {
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

      <Text>Resources</Text>
      <div>
        {numOfResources <= MAX_RESOURCES ? (
          <div>
            {Array.from(
              { length: numOfResources },
              (_, index) => index + 1
            ).map((resourceNumber) => (
              <CustomInput
                key={resourceNumber}
                name={`resource${resourceNumber}`}
                handleInputFunction={handleResourceChange(
                  `resource${resourceNumber}`
                )}
                placeholder={`Link-${resourceNumber}`}
                value={value[resourceNumber - 1] || ''}
              />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <Text color="red">{error}</Text>
    </>
  )
}
