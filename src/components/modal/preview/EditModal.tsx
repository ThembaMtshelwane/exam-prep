import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  Box,
  Text,
  ModalFooter,
} from '@chakra-ui/react'
import React, { useState } from 'react'

type EditModalProps = {
  qid: string
  open: boolean
  handleClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ qid, open, handleClose }) => {
  const [showResources, setShowResources] = useState<boolean>(false)
  const onSumbit = () => {
    console.log('Update the question')
  }
  const onShowResource = () => {
    setShowResources(true)
  }

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          padding={3}
          textAlign="center"
          mt={5}
          mb={0}
        >
          Edit Question {qid}
        </ModalHeader>
        <Box pl={3} pr={3}>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            padding="10px 0px"
            justifyContent="center"
            pb={6}
          >
            <form onSubmit={onSumbit}>
              <Text fontWeight={600} fontSize={15}>
                Question Text
              </Text>
              <Input required />
              <Text fontWeight={600} fontSize={15}>
                Answer
              </Text>
              <Input required></Input>
              <AddQoptions />

              <Button onClick={onShowResource}>Add Resources</Button>
              {showResources ? <AddResources /> : ''}
            </form>
          </ModalBody>
          <ModalFooter>
            <SaveButton />
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}
export default EditModal

type saveProps = {}
const SaveButton: React.FC<saveProps> = () => {
  return (
    <>
      <Button>Save</Button>
    </>
  )
}

type addOptionsProps = {}

const AddQoptions: React.FC<addOptionsProps> = () => {
  const [option1, setOption1] = useState<string>('')
  const [option2, setOption2] = useState<string>('')
  const [option3, setOption3] = useState<string>('')
  const [option4, setOption4] = useState<string>('')

  const handleOption1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption1(event.target.value)
  }
  const handleOption2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption2(event.target.value)
  }
  const handleOption3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption3(event.target.value)
  }
  const handleOption4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption4(event.target.value)
  }
  return (
    <>
      <Text fontWeight={600} fontSize={15}>
        Options
      </Text>
      <CustomInput
        name={'A'}
        handleInputFunction={handleOption1}
        placeholder={'Orange'}
        isRequired={true}
      />
      <CustomInput
        name={'B'}
        handleInputFunction={handleOption2}
        placeholder={'Yellow'}
        isRequired={true}
      />
      <CustomInput
        name={'C'}
        handleInputFunction={handleOption3}
        placeholder={'Blue'}
        isRequired={true}
      />
      <CustomInput
        name={'D'}
        handleInputFunction={handleOption4}
        placeholder={'Green'}
        isRequired={true}
      />
    </>
  )
}

type addResourcesProps = {}

const AddResources: React.FC<addResourcesProps> = () => {
  const [resource1, setResource1] = useState<string>('')
  const [resource2, setResource2] = useState<string>('')
  const [resource3, setResource3] = useState<string>('')
  const [resource4, setResource4] = useState<string>('')
  const [numOfLOs, setNumOfLOs] = useState<number>(0)
  const [error, setError] = useState('')
  const [resourceList, setResourceList] = useState([])
  const MAX_RESOURCES: number = 4

  const handleNumOfResources = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNumOfLOs(Number(event.target.value))

    if (Number(event.target.value) > MAX_RESOURCES) {
      setError(`Resources must be a max of ${MAX_RESOURCES}`)
      return
    }
  }

  const handleResourceList = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResourceList((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
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
                  <CustomInput
                    name={''}
                    handleInputFunction={handleResourceList}
                    placeholder={`Link-${i + 1}`}
                    isRequired={true}
                  />
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
