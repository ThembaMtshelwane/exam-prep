import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useLectureDataContext } from '../admin/LectureDataProvider'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'

type DeleteButtonProps = {
  topicName: string
  deleteType: 'deleteTopic' | 'deleteQuizHistory'
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  topicName,
  deleteType,
}) => {
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)
  const { lectureData, setLectureData } = useLectureDataContext()

  const refreshLectureData = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'topics'))
    const updatedData = querySnapshot.docs.map((doc) => ({
      topicID: doc.id,
      ...doc.data(),
    }))
    setLectureData(updatedData)
  }

  const deleteTopic = async (topicName: string) => {
    if (!user) return
    setIsLoading(true)
    try {
      const quizSnippetDocRef = doc(
        firestore,
        `lecturers/${user.uid}/quizSnippets`,
        topicName
      )
      const topicDocRef = doc(firestore, 'topics', topicName)

      await Promise.all([deleteDoc(quizSnippetDocRef), deleteDoc(topicDocRef)])

      const topicDoc = await getDoc(topicDocRef)
      if (!topicDoc.exists()) {
        console.log(`Topic '${topicName}' deleted successfully.`)
        setLectureData((prevLectureData) =>
          prevLectureData.filter((topic) => topic.topicID !== topicName)
        )
      } else {
        console.warn(`Topic '${topicName}' was NOT deleted.`)
      }
    } catch (error) {
      console.error('Error deleting topic:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteQuizHistory = async (topicName: string) => {
    setIsLoading(true)
    try {
      const quizHistoryCollectionRef = collection(
        firestore,
        `topics/${topicName}/quizHistory`
      )
      const querySnapshot = await getDocs(quizHistoryCollectionRef)

      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref))
      await Promise.all(deletePromises)

      console.log(`Student data for ${topicName} quiz deleted successfully.`)
    } catch (error) {
      console.error('Error deleting quiz history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      bg="#265e9e"
      color="white"
      _hover={{ bg: 'white', color: '#265e9e', transform: 'scale(0.98)' }}
      isLoading={isLoading}
      onClick={() =>
        deleteType === 'deleteTopic'
          ? deleteTopic(topicName)
          : deleteQuizHistory(topicName)
      }
      marginLeft="1rem"
    >
      {deleteType === 'deleteTopic' ? 'Delete' : 'Delete All History'}
    </Button>
  )
}

export default DeleteButton
