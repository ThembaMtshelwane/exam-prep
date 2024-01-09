import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useLectureDataContext } from '../admin/LectureDataProvider'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'

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

      // Wait for a short delay to ensure deletion is processed
      await new Promise((resolve) => setTimeout(resolve, 500))

      const topicDoc = await getDoc(topicDocRef)

      if (topicDoc.exists()) {
        // Document still exists after deletion
        console.log(`Topic '${topicName}' was not deleted successfully.`)
      } else {
        console.log(`Topic '${topicName}' deleted successfully.`)
        const updatedLectureData = lectureData.filter(
          (topic) => topic.topicName !== topicName
        )
        setLectureData(updatedLectureData)
      }
    } catch (error) {
      console.error('Error deleting topic:', error)
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
