import { storage } from '@/src/firebase/clientApp'
import { Button, Image, Spinner, Text } from '@chakra-ui/react'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import React, { useState } from 'react'

type ImageInputProps = {
  handleImageData: (fileURL: string) => void
  qid: string
  name: string
  updateImageDataInPreview: (newImageData: string) => void
}

const ImageInput: React.FC<ImageInputProps> = ({
  handleImageData,
  qid,
  name,
  updateImageDataInPreview,
}) => {
  const [isEditImage, setIsEditImage] = useState<boolean>(false)
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [fileLink, setFileLink] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadFile = () => {
    setIsLoading(true)

    if (fileUpload === null) {
      setErrorMessage('No file chosen')
      setIsLoading(false)
      return
    }

    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        setErrorMessage('File uploaded')
        setIsSuccessful(true)
        getDownloadURL(fileRef).then((url) => {
          setFileLink(url.toString())
          handleImageData(url.toString()) // Update image URL in CustomModal
          updateImageDataInPreview(url.toString()) // Update image URL in PreviewCard
        })
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setIsSuccessful(false)
      })
    setIsLoading(false)
  }

  const removeFile = () => {
    setIsLoading(true)

    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    deleteObject(fileRef)
      .then(() => {
        setErrorMessage('File deleted')
        setIsSuccessful(true)
        setFileLink('')
        setFileLink('')
        handleImageData('') // Update image URL in CustomModal
        updateImageDataInPreview('') // Update image URL in PreviewCard
      })
      .catch((error) => {
        setErrorMessage('Error deleting file')
        setIsSuccessful(false)
        console.error(error)
      })
    setIsLoading(false)
  }

  const editImage = () => {
    setIsEditImage((prevState) => !prevState)
    // Reset file upload state on toggle between add/edit modes
    setFileUpload(null)
  }

  return (
    <div>
      <Button onClick={editImage}>
        {isEditImage ? 'Cancel Edit' : 'Edit Image'}
      </Button>
      {isEditImage ? (
        <>
          <Image src={fileLink} />
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
          <Button onClick={uploadFile} isLoading={isLoading}>
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : fileLink ? (
              'Replace'
            ) : (
              'Upload'
            )}
          </Button>
          {fileLink && (
            <Button onClick={removeFile} isLoading={isLoading}>
              {isLoading ? <Spinner size="sm" color="white" /> : 'Remove'}
            </Button>
          )}
          {isSuccessful ? (
            <Text color="green">{errorMessage} </Text>
          ) : (
            <Text color="red">{errorMessage} </Text>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  )
}
export default ImageInput
