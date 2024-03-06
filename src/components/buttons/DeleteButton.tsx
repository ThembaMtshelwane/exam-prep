import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useLectureDataContext } from '../admin/LectureDataProvider'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'

type DeleteButtonProps = {
  topicName: string
  deleteType: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  topicName,
  deleteType,
}) => {
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

  const deleteQuizHistory = async (topicName: string) => {
    setIsLoading(true)
    try {
      // Reference to the collection under topics/name/quizHistory
      const quizHistoryCollectionRef = collection(
        firestore,
        `topics/${topicName}/quizHistory`
      )

      // Delete all documents within the collection
      const querySnapshot = await getDocs(quizHistoryCollectionRef)
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      // Wait for a short delay to ensure deletion is processed
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if the collection still exists after deletion
      const quizHistoryCollection = await getDocs(quizHistoryCollectionRef)

      if (!quizHistoryCollection.empty) {
        // Collection still exists after deletion
        console.log(
          `Student data for ${topicName} quiz was not deleted successfully.`
        )
      } else {
        console.log(
          `Student data for ${topicName} quiz is deleted successfully.`
        )
      }
    } catch (error) {
      console.error('Error deleting topic:', error)
    }
    setIsLoading(false)
  }

  return (
    <div>
      {deleteType == 'deleteTopic' ? (
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
      ) : (
        <Button
          bg="#265e9e"
          color="white"
          _hover={{
            bg: 'white',
            color: '#265e9e',
            transform: 'scale(0.98)',
          }}
          isLoading={isLoading}
          onClick={() => deleteQuizHistory(topicName)}
          marginLeft="1rem"
        >
          Delete All History
        </Button>
      )}
    </div>
  )
}
export default DeleteButton
