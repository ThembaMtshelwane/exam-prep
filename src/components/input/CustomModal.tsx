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
  questionLearningObjectives: string
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
  questionPreview?: any //FormData
  updateQuestionPreview?: (updatedData: any) => void
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

  const [formData, setFormData] = useState<FormData>({
    questionLearningObjectives: questionPreview
      ? questionPreview.questionLearningObjectives
      : '',
    question: questionPreview ? questionPreview.question || '' : '',
    fileURL: questionPreview ? questionPreview.fileURL : '',
    questionAnswer: questionPreview ? questionPreview.questionAnswer || '' : '',
    questionOptions: questionPreview
      ? questionPreview.questionOptions
      : ['', '', '', '', ''],
    questionResources: questionPreview ? questionPreview.questionResources : [],
    questionID: questionPreview ? questionPreview.questionID : '',
    questionLevel: questionPreview ? questionPreview.questionLevel || 0 : 0,
    timestamp: null,
  })
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()
  const [imageData, setImageData] = useState<string>(
    questionPreview ? questionPreview.fileURL : ''
  )

  // const emptyForm = {
  //   questionLearningObjectives: '',
  //   question: '',
  //   fileURL: '',
  //   questionAnswer: '',
  //   questionOptions: ['', '', '', '', ''],
  //   questionResources: [''],
  //   questionID: '',
  //   questionLevel: 0,
  //   timestamp: null,
  // }

  // Update form fields with formData on mount or when questionPreview changes
  useEffect(() => {
    // if (questionPreview === undefined) {
    //   setFormData({
    //     ...emptyForm,
    //   })
    // } else {
    setFormData({
      ...questionPreview,
    })
    // }
  }, [questionPreview])

  // Handler function to update formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Randomize options
  const randomizeOrder = (orderedOptions: string[]) => {
    for (let i = orderedOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[orderedOptions[i], orderedOptions[j]] = [
        orderedOptions[j],
        orderedOptions[i],
      ]
    }
    return orderedOptions
  }

  const onSubmit = async () => {
    setSubmitting(true)
    const orderedOptions = formData.questionOptions
    // Randomize the order of options
    const questionOptions = randomizeOrder(orderedOptions)

    try {
      // if (title === 'Add Question') {
      //   await setDoc(doc(firestore, `topics/${topicID}/questions/${id}/`), {
      //     ...formData,
      //     questionOptions,
      //     timestamp: serverTimestamp(),
      //   })
      // } else if (title === 'Edit Question') {
      await updateDoc(doc(firestore, `topics/${topicID}/questions/${id}`), {
        ...formData,
        questionOptions,
        timestamp: serverTimestamp(),
      })
      // }
      if (updateQuestionPreview) {
        updateQuestionPreview(formData)
      }
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

  // Function to receive lo text from UserTextInput component
  const handleLOTextData = (loText: string) => {
    setFormData((prevData) => ({
      ...prevData,
      questionLearningObjectives: loText, // Update answer in the form data
    }))
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

  // Function to update image data in PreviewCard
  const updateImageDataInPreview = (newImageData: string) => {
    if (updateQuestionPreview) {
      setImageData(newImageData)
      updateQuestionPreview({ ...formData, fileURL: newImageData }) // Update the questionPreview with the new image URL
    }
  }

  // Function to receive fileURL data from ImageInput component
  const handleImageData = (fileURL: string) => {
    setFormData((prevData) => ({
      ...prevData,
      fileURL: fileURL, // Update answer in the form data
    }))
  }

  // Function to receive answer text from UserTextInput component
  const handleAnswerTextData = (answer: string) => {
    setFormData((prevData) => ({
      ...prevData,
      questionAnswer: answer, // Update answer in the form data
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

  // console.log(' formData.questionOptions', formData.questionOptions)

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
                  handleTextInputData={handleLOTextData}
                  textLabel="Learning Objective/s"
                  value={formData.questionLearningObjectives}
                  handleChange={handleChange}
                  name="questionLearningObjectives" // Pass the name of the input field
                />
              </FormControl>
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
                  qid={formData.questionID}
                  name={topicID}
                  updateImageDataInPreview={updateImageDataInPreview}
                  handleImageData={handleImageData}
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
                  initialOptions={
                    formData.questionOptions
                      ? formData.questionOptions
                      : ['', '', '', '', '']
                  }
                />
              </FormControl>

              <FormControl>
                <AddResourcesList
                  handleResourcesData={handleResourcesData}
                  value={
                    formData.questionResources ? formData.questionResources : []
                  }
                  num={
                    formData.questionResources
                      ? formData.questionResources.length
                      : 0
                  }
                />
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
