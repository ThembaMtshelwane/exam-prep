import React, { useState, ChangeEvent, FormEvent } from 'react'
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

  const [isEditImage, setIsEditImage] = useState<boolean>(false)
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [fileLink, setFileLink] = useState<string>('')

  const onShowResource = () => {
    setShowResources(true)
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(event.target.value)
  }

  const uploadFile = () => {
    if (fileUpload === null) return

    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        alert('File uploaded')
        getDownloadURL(fileRef).then((url) => {
          setFileLink(url.toString())
        })
      })
      .catch((error) => {
        alert('Error uploading file')
        console.error(error)
      })
  }

  const removeFile = () => {
    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    deleteObject(fileRef)
      .then(() => {
        alert('File deleted')
        setFileLink('')
      })
      .catch((error) => {
        alert('Error deleting file')
        console.error(error)
      })
  }

  const editImage = () => {
    setIsEditImage((prevState) => !prevState)
  }

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updatedQuestion = {
      question,
      questionAnswer,
      // questionOptions: options,
      // questionResources: Object.values(resources),
      fileURL: fileLink,
    }

    const questionRef = doc(firestore, `topics/${name}/questions`, qid)
    await updateDoc(questionRef, updatedQuestion)
    // Avoid hard reload, consider updating state or fetching new data here
  }

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Question {qid}</ModalHeader>
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
              <Input
                required
                onChange={(e) => handleInputChange(e, setQuestion)}
              />

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
              <Input
                required
                onChange={(e) => handleInputChange(e, setAnswer)}
              />

              <InputList/>
              <Button onClick={onShowResource}>Add Resources</Button>
              {showResources ? (
                <AddResources/>
              ) : (
                ''
              )}
              <Button type="submit">Save</Button>
            </form>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
