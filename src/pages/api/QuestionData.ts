import { firestore } from '@/src/firebase/clientApp';
import { collection, getDocs } from "firebase/firestore";
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from "safe-json-stringify";

export const getQuestion  = async (context: GetServerSidePropsContext) =>{
  // let questionsFromDB: QuestionTemplate[] =[]
    // Get topic data from database and pass it to the client
    try {
        const topicQuestionsCollectionRef = `topics/${context.query.topicID as string}/questions`// get the approprate collection based on the router input
        const questionsFromDB = await getDocs(collection(firestore,topicQuestionsCollectionRef)) // get questions collection from database
                
         let questions:any[] =[]
         const name = context.query.topicID as string
 
         // store all questions from the database into the questions array
         questionsFromDB.forEach((doc) => {
             questions.push({ ...doc.data()})
         });
 
         return { //This will make sure the questions are available gloabally
             props:{
                 topicQuestionData:questions.length!==0
                 ? JSON.parse(safeJsonStringify(
                     questions
                 ))
                 :"",name
             }
         }
 
     } catch (error) {
         console.log('getServerSideProps error',error)   
     }
}