import { auth, firestore } from '@/src/firebase/clientApp';
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import safeJsonStringify from "safe-json-stringify";

export const getLectureData = async (lectureID:any) =>{

    try {
        const LectureQuizCollectionRef = '/lecturers/'+lectureID+'/quizSnippets'// the quiz snippets collection reference
        const quizSnippets = await getDocs(collection(firestore,LectureQuizCollectionRef)) // get the quiz snippets  collection from database
                
         let snippets:any[] =[]
 
         // store all topics from the database into the questions array
         quizSnippets.forEach((doc) => {
            snippets.push({ ...doc.data()})
         });
 
 
         return { //This will make sure the topics are available gloabally
             props:{
                 lectureData:snippets.length!==0
                 ? JSON.parse(safeJsonStringify(
                    snippets
                 ))
                 :"",
             }
         }
 
     } catch (error) {
         console.log('getServerSideProps error',error)   
     }
}