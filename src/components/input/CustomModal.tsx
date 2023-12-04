import { firestore } from '@/src/firebase/clientApp'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  Text,
  useToast,
} from '@chakra-ui/react'

import { setDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SaveButton from '../buttons/SaveButton'
import { AddOptionsList } from '../lists/AddOptionsList'
import { AddResourcesList } from '../lists/AddResourcesList'

import ImageInput from './ImageInput'
import UserTextInput from './UserTextInput'

type FormData = {
  question: string
  fileURL: string
  questionAnswer: string
  questionOptions: string[]
  questionResources: string[]
  questionID: string
  questionLevel: number
  timestamp: any
}

type CustomModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  topicID: string
  id: string
  level: number
  onQuestionAdded?: () => void
  questionPreview: any
  updateQuestionPreview: (updatedData: any) => void
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  isOpen,
  onClose,
  topicID,
  id,
  level,
  onQuestionAdded,
  questionPreview,
  updateQuestionPreview,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [formData, setFormData] = useState({
    question: questionPreview.question,
    fileURL: questionPreview.fileURL,
    questionAnswer: questionPreview.questionAnswer,
    questionOptions: questionPreview.questionOptions,
    questionResources: questionPreview.questionResources,
    questionID: questionPreview.questionID,
    questionLevel: questionPreview.questionLevel,
    timestamp: null,
  })
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  // Update form fields with formData on mount or when questionPreview changes
  useEffect(() => {
    setFormData({
      ...questionPreview,
    })
  }, [questionPreview])

  // Handler function to update formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const onSubmit = async () => {
    setSubmitting(true)

    try {
      if (title === 'Add Question') {
        await setDoc(doc(firestore, `topics/${topicID}/questions/${id}/`), {
          ...formData,
          timestamp: serverTimestamp(),
        })
      } else if (title === 'Edit Question') {
        await updateDoc(doc(firestore, `topics/${topicID}/questions`, id), {
          ...formData,
          timestamp: serverTimestamp(),
        })
      }
      updateQuestionPreview(formData)
      reset() // Clear form fields after successful submission
      toast({
        title: 'Form submitted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose() // Close the modal after form submission
    } catch (err) {
      toast({
        title: 'Error submitting form. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error submitting form:', err)
    } finally {
      setSubmitting(false)
    }
    if (title === 'Add Question' && onQuestionAdded) {
      onQuestionAdded() // Inform QuestionNode that a question has been added
    }
    onClose() // Close the modal
  }
  // Function to receive options data from InputList component
  const handleQuestionTextData = (question: string) => {
    setFormData((prevData) => ({
      ...prevData,
      question: question, // Update question text in the form data
      questionID: id, // Update id in the form data
      questionLevel: level, //Update question level in the form data
    }))
  }

  // Function to receive options data from InputList component
  const handleAnswerTextData = (answer: string) => {
    setFormData((prevData) => ({
      ...prevData,
      questionAnswer: answer, // Update answer in the form data
    }))
  }
  // Function to receive options data from InputList component
  const handleImageData = (fileURL: string) => {
    setFormData((prevData) => ({
      ...prevData,
      fileURL: fileURL, // Update answer in the form data
    }))
  }
  // Function to receive options data from InputList component
  const handleOptionsData = (options: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      questionOptions: options, // Update options in the form data
    }))
  }

  // Function to receive resource data from AddResources component
  const handleResourcesData = (resourceList: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      questionResources: resourceList, // Update resourceList in the form data
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <UserTextInput
                  handleTextInputData={handleQuestionTextData}
                  textLabel="Question"
                  value={formData.question}
                  handleChange={handleChange}
                  name="question" // Pass the name of the input field
                />
              </FormControl>

              <FormControl>
                <ImageInput
                  handleImageData={handleImageData}
                  qid={formData.questionID}
                  name={topicID}
                />
              </FormControl>

              <FormControl>
                <UserTextInput
                  handleTextInputData={handleAnswerTextData}
                  textLabel="Answer"
                  value={formData.questionAnswer}
                  handleChange={handleChange}
                  name="questionAnswer" // Pass the name of the input field
                />
              </FormControl>

              <FormControl>
                <AddOptionsList
                  handleOptionsData={handleOptionsData}
                  initialOptions={formData.questionOptions}
                />
              </FormControl>

              <FormControl>
                {/* <AddResourcesList
                  handleResourcesData={handleResourcesData}
                  // initialOptions={formData.questionOptions}
                /> */}
              </FormControl>

              <SaveButton loading={submitting} />
              {submitting && <Text>Submitting...</Text>}
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CustomModal
