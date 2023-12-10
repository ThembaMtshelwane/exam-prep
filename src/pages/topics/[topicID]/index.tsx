import { firestore } from '../../../firebase/clientApp'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import React, { createContext } from 'react'
import safeJsonStringify from 'safe-json-stringify'
import NotFound from '@/src/components/Topics/NotFound'
import AddQuestion from '@/src/components/admin/AddQuestion'
import PageContent from '@/src/components/layout/PageContent'

type CreateQuizProps = {
  topicData: any
  topicQuestionData: any[]
  name: string
}

const CreateQuiz: React.FC<CreateQuizProps> = ({
  topicData,
  topicQuestionData,
}) => {
  if (!topicData) {
    return <NotFound />
  }

  return (
    <>
      <PageContent>
        <AddQuestion
          topicID={topicData.id}
          numOfLOs={topicData.numberOfLearningObjectives}
        />
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get topic data and pass it to the client
  try {
    const topicDocRef = doc(
      firestore,
      'topics',
      context.query.topicID as string
    )
    const topicDoc = await getDoc(topicDocRef)

    let questions: any[] = []
    const name = context.query.topicID as string
    // get the appropriate collection based on the router input
    const topicQuestionsCollectionRef = `topics/${name}/questions`

    console.log('Fetching data from:', topicQuestionsCollectionRef)

    // get questions collection from database
    const questionsFromDB = await getDocs(
      collection(firestore, topicQuestionsCollectionRef)
    )

    // console.log('Questions from DB:', questionsFromDB)

    // store all questions from the database into the questions array
    questionsFromDB.forEach((doc) => {
      questions.push({ ...doc.data() })
    })

    console.log('Questions from DB in questions array:', questions)
    return {
      props: {
        topicData: topicDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: topicDoc.id,
                ...topicDoc.data(),
              })
            )
          : '',
        topicQuestionData:
          questions.length !== 0
            ? JSON.parse(safeJsonStringify(questions))
            : [],
      },
    }
  } catch (error) {
    console.log('getServerSideProps error', error)
  }
}

export default CreateQuiz
