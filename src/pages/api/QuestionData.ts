import { firestore } from '@/src/firebase/clientApp'
import { collection, getDocs } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import safeJsonStringify from 'safe-json-stringify'

export const getQuestion = async (context: GetServerSidePropsContext) => {
  // let questionsFromDB: QuestionTemplate[] =[]
  // Get topic data from database and pass it to the client
  try {
    let questions: any[] = []
    const name = context.query.topicID as string
    // get the appropriate collection based on the router input
    const topicQuestionsCollectionRef = `topics/${name}/questions`

    console.log('Fetching data from:', topicQuestionsCollectionRef)

    // get questions collection from database
    const questionsFromDB = await getDocs(
      collection(firestore, topicQuestionsCollectionRef)
    )

    console.log('Questions from DB:', questionsFromDB)

    // store all questions from the database into the questions array
    questionsFromDB.forEach((doc) => {
      questions.push({ ...doc.data() })
    })

    console.log('Processed questions:', questions)

    return {
      //This will make sure the questions are available globally
      props: {
        topicQuestionData:
          questions.length !== 0
            ? JSON.parse(safeJsonStringify(questions))
            : [],
        name,
      },
    }
  } catch (error) {
    console.log('getServerSideProps error', error)
  }
}
