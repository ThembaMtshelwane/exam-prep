import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useLectureDataContext } from '../admin/LectureDataProvider'
import { deleteDoc, doc } from 'firebase/firestore'

type DeleteButtonProps = {
  topicName: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ topicName }) => {
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)
  const { lectureData, setLectureData } = useLectureDataContext()

  const deleteTopic = async (topicName: string) => {
    setIsLoading(true)
    try {
      // Reference to the document under /lecturers/document/quizSnippets
      const quizSnippetDocRef = doc(
        firestore,
        `lecturers/${user?.uid}/quizSnippets`,
        topicName
      )

      // Reference to the document under /topics
      const topicDocRef = doc(firestore, 'topics', topicName)

      // Delete documents
      await deleteDoc(quizSnippetDocRef)
      await deleteDoc(topicDocRef)

      // Remove the deleted topic from the cached lecture data
      const updatedLectureData = lectureData.filter(
        (topic) => topic.topicName !== topicName
      )
      setLectureData(updatedLectureData)

      console.log(`Topic '${topicName}' deleted successfully.`)
    } catch (error) {
      console.error('Error deleting topic:', error)
      // Handle error here
    }
    setIsLoading(false)
  }
  return (
    <Button
      bg="#265e9e"
      color="white"
      _hover={{
        bg: 'white',
        color: '#265e9e',
        transform: 'scale(0.98)',
      }}
      isLoading={isLoading}
      onClick={() => deleteTopic(topicName)}
      marginLeft="1rem"
    >
      Delete
    </Button>
  )
}
export default DeleteButton
