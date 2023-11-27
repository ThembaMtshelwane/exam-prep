import { firestore } from '@/src/firebase/clientApp'
import { collection, getDocs } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'

export const getAllUsers = async (context: GetServerSidePropsContext) => {
  try {
    /********* Get quiz name *********/
    const name = context.query.topicID as string

    /********* Get all users *********/
    const userCollectionRef = `/students` // the quiz snippets collection reference
    const userFromDB = await getDocs(collection(firestore, userCollectionRef)) // get the quiz snippets  collection from database
    let allUsers: any[] = []
    // store all users from the database into the allUsers array
    userFromDB.forEach((doc) => {
      allUsers.push({ ...doc.data() })
    })
    /* * * * *  Get quiz history from database * * * * */
    const quizHistoryCollectionRef = `topics/${name}/quizHistory` // the quiz snippets collection reference
    const quizHistoryFromDB = await getDocs(
      collection(firestore, quizHistoryCollectionRef)
    ) // get the quiz snippets  collection from database
    let quizHistory: any[] = []
    // store all quiz history from the database into the quizHistoru array
    quizHistoryFromDB.forEach((doc) => {
      quizHistory.push({ ...doc.data() })
    })

    return {
      //This will make sure the topics are available gloabally
      props: {
        userData:
          allUsers.length !== 0 ? JSON.parse(safeJsonStringify(allUsers)) : '',
        name,
        quizHistory:
          quizHistory.length !== 0
            ? JSON.parse(safeJsonStringify(quizHistory))
            : '',
      },
    }
  } catch (error) {
    console.log('getServerSideProps error', error)
  }
}
