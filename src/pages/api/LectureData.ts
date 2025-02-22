import { auth, firestore } from '@/src/firebase/clientApp'
import { collection, getDocs } from 'firebase/firestore'
import safeJsonStringify from 'safe-json-stringify'

export const getLectureData = async (lectureID: string) => {
  try {
    if (!lectureID) throw new Error('Invalid lecture ID')

    const LectureQuizCollectionRef = collection(
      firestore,
      'lecturers',
      lectureID,
      'quizSnippets'
    )
    const quizSnippetsFromDB = await getDocs(LectureQuizCollectionRef)

    const snippets = quizSnippetsFromDB.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return {
      props: {
        lectureInfo:
          snippets.length > 0 ? JSON.parse(safeJsonStringify(snippets)) : [],
      },
    }
  } catch (error) {
    console.error('Error fetching lecture data:', error)
    return { props: { lectureInfo: [] } }
  }
}
