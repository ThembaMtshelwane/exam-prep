import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { firestore } from '@/src/firebase/clientApp'
import SaveButton from '../../buttons/SaveButton'
import InputList, { AddResources } from '../../lists/InputList'

type FormData = {
  questionText: string
  fileURL: string
  answer: string
  options: string[]
  resourceList: string[]
}

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
  onQuestionAdded: () => void // Callback function to inform QuestionNode
  topicID: string
  id: string
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  onQuestionAdded,
  topicID,
  id,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    questionText: '',
    fileURL: '',
    answer: '',
    options: ['', '', '', ''],
    resourceList: ['', '', '', ''],
  })
  const toast = useToast()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)

    try {
      await setDoc(doc(firestore, `topics/${topicID}/question/${id}/`), {
        ...formData,
        timestamp: serverTimestamp(),
      })

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
    onQuestionAdded() // Inform QuestionNode that a question has been added
    onClose() // Close the modal
  }

  // Function to receive options data from InputList component
  const handleOptionsData = (options: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      options: options, // Update options in the form data
    }))
  }

  // Function to receive resource data from AddResources component
  const handleResourcesData = (resourceList: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      resourceList: resourceList, // Update resourceList in the form data
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="questionText">Question Text:</FormLabel>
                <Input
                  id="questionText"
                  type="text"
                  {...register('questionText', { required: true })}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="answer">Answer:</FormLabel>
                <Input
                  id="answer"
                  type="text"
                  {...register('answer', { required: true })}
                />
              </FormControl>

              <FormControl>
                <InputList handleOptionsData={handleOptionsData} />
              </FormControl>

              <FormControl>
                <AddResources handleResourcesData={handleResourcesData} />
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

export default AddModal
