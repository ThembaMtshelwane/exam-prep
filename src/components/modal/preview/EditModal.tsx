import { firestore, storage } from '@/src/firebase/clientApp'
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
  Image,
} from '@chakra-ui/react'
import { doc, updateDoc } from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import React, { useState } from 'react'

type EditModalProps = {
  qid: string
  name: string
  open: boolean
  handleClose: () => void
  fileURL: any
}

const EditModal: React.FC<EditModalProps> = ({
  qid,
  name,
  fileURL,
  open,
  handleClose,
}) => {
  const [showResources, setShowResources] = useState<boolean>(false)
  const [questionAnswer, setAnswer] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [option1, setOption1] = useState<string>('')
  const [option2, setOption2] = useState<string>('')
  const [option3, setOption3] = useState<string>('')
  const [option4, setOption4] = useState<string>('')
  const [resource1, setResource1] = useState<string>('')
  const [resource2, setResource2] = useState<string>('')
  const [resource3, setResource3] = useState<string>('')
  const [resource4, setResource4] = useState<string>('')
  const [isEditImage, setIsEditImage] = useState<boolean>(false)
  const onShowResource = () => {
    setShowResources(true)
  }
  const handleQuestionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
  }

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }
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
  const handleResourceChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResource1(event.target.value)
  }
  const handleResourceChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResource2(event.target.value)
  }
  const handleResourceChange3 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResource3(event.target.value)
  }
  const handleResourceChange4 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResource4(event.target.value)
  }

  const [fileUpload, setFileUpload] = useState<any>(null)
  const [fileLink, setFileLink] = useState<string>('')

  const uploadFile = () => {
    if (fileUpload === null) return

    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        alert('file uploaded')
        getDownloadURL(fileRef).then((url) => {
          setFileLink(url.toString())
        })
      })
      .catch((error) => {
        alert('ERROR ***** ERROR ******ERROR')
      })
  }
  const removeFile = () => {
    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    deleteObject(fileRef)
      .then(() => {
        alert('file deleted')
        setFileLink('')
      })
      .catch((error) => {
        alert(error)
      })
  }
  const editImage = () => {
    setIsEditImage((prevState) => {
      const newSate = !prevState
      return newSate
    })
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updatedQuestion = {
      question,
      questionAnswer,
      questionOptions: [option1, option2, option3, option4],
      questionResources: [resource1, resource2, resource3, resource4],
      fileURL: fileLink,
    }

    const questionRef = doc(firestore, `topics/${name}/questions`, qid)
    await updateDoc(questionRef, updatedQuestion)
    console.log('question updated')
    console.log(updatedQuestion)
    window.location.reload()
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
            <form onSubmit={handleUpdate}>
              <Text fontWeight={600} fontSize={15}>
                Question Text
              </Text>
              <Input required onChange={handleQuestionText} />
              <Button onClick={editImage}>Edit image</Button>
              {isEditImage ? (
                <>
                  <Image src={fileURL} />
                  <input
                    type="file"
                    onChange={(event) => {
                      if (event.target.files === null) {
                        console.log('No file selected')
                      } else {
                        setFileUpload(event.target.files[0])
                      }
                    }}
                  />
                  <Button onClick={uploadFile}>Replace Image</Button>
                  <Button onClick={removeFile}>Remove Image</Button>
                </>
              ) : (
                ''
              )}

              <Text fontWeight={600} fontSize={15}>
                Answer
              </Text>
              <Input required onChange={handleAnswer}></Input>
              <AddQoptions
                hfunctions={[
                  handleOption1,
                  handleOption2,
                  handleOption3,
                  handleOption4,
                ]}
              />
              <Button onClick={onShowResource}>Add Resources</Button>
              {showResources ? (
                <AddResources
                  hfunctions={[
                    handleResourceChange1,
                    handleResourceChange2,
                    handleResourceChange3,
                    handleResourceChange4,
                  ]}
                />
              ) : (
                ''
              )}
              <Button type="submit"> Save</Button>
            </form>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
export default EditModal

type imageProps = {
  qid: string
  name: string
  file: any
}

const AddImage: React.FC<imageProps> = (data) => {
  return (
    <>
      {data.file != '' ? (
        <>
          <Image objectFit="cover" src={data.file} alt="" />
          <ImageInput qid={data.qid} name={data.name} />
        </>
      ) : (
        'Add File ?'
      )}
    </>
  )
}
type ImageInputProps = {
  qid: string
  name: string
}

const ImageInput: React.FC<ImageInputProps> = (data) => {
  return <></>
}

type addOptionsProps = {
  hfunctions: any[]
}
const AddQoptions: React.FC<addOptionsProps> = (data) => {
  return (
    <>
      <Text fontWeight={600} fontSize={15}>
        Options
      </Text>
      <CustomInput
        name={'A'}
        handleInputFunction={data.hfunctions[0]}
        placeholder={'Orange'}
        isRequired={true}
      />
      <CustomInput
        name={'B'}
        handleInputFunction={data.hfunctions[1]}
        placeholder={'Yellow'}
        isRequired={true}
      />
      <CustomInput
        name={'C'}
        handleInputFunction={data.hfunctions[2]}
        placeholder={'Blue'}
        isRequired={true}
      />
      <CustomInput
        name={'D'}
        handleInputFunction={data.hfunctions[3]}
        placeholder={'Green'}
        isRequired={true}
      />
    </>
  )
}

type addResourcesProps = {
  hfunctions: any[]
}

const AddResources: React.FC<addResourcesProps> = (data) => {
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
                      handleInputFunction={data.hfunctions[0]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 1 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={data.hfunctions[1]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 2 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={data.hfunctions[2]}
                      placeholder={`Link-${i + 1}`}
                      isRequired={true}
                    />
                  ) : (
                    ''
                  )}
                  {i == 3 ? (
                    <CustomInput
                      name={''}
                      handleInputFunction={data.hfunctions[3]}
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
