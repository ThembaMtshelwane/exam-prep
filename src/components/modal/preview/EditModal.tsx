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
import CustomInput from '../../input/CustomInput'
import InputList, { AddResources } from '../../lists/InputList'

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
  const placeholders = ['A', 'B', 'C', 'D']

  const [resource1, setResource1] = useState<string>('')
  const [resource2, setResource2] = useState<string>('')
  const [resource3, setResource3] = useState<string>('')
  const [resource4, setResource4] = useState<string>('')

  const [isEditImage, setIsEditImage] = useState<boolean>(false)
  const [fileUpload, setFileUpload] = useState<any>(null)
  const [fileLink, setFileLink] = useState<string>('')

  const onShowResource = () => {
    setShowResources(true)
  }

  // Change question text
  const handleQuestionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
  }

  // Change answer text
  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  // Change option text
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

  // Change resources
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

  // Edit image
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

              <InputList
                listName="Options"
                hfunctions={[
                  handleOption1,
                  handleOption2,
                  handleOption3,
                  handleOption4,
                ]}
                placeholders={placeholders}
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
