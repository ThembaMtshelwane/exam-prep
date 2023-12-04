import { storage } from '@/src/firebase/clientApp'
import { Button, Image } from '@chakra-ui/react'
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
}

const ImageInput: React.FC<ImageInputProps> = ({
  handleImageData,
  qid,
  name,
}) => {
  const [isEditImage, setIsEditImage] = useState<boolean>(false)
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [fileLink, setFileLink] = useState<string>('')

  const uploadFile = () => {
    if (fileUpload === null) return

    const fileRef = ref(storage, `questionFiles/${name}/${qid}`)
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        alert('File uploaded')
        getDownloadURL(fileRef).then((url) => {
          setFileLink(url.toString())
          handleImageData(url.toString())
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

  return (
    <div>
      <Button onClick={editImage}>Edit image</Button>
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
          <Button onClick={uploadFile}>Replace Image</Button>
          <Button onClick={removeFile}>Remove Image</Button>
        </>
      ) : (
        ''
      )}
    </div>
  )
}
export default ImageInput
