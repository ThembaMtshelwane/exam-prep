import { auth, firestore } from '@/src/firebase/clientApp';
import { collection, getDocs } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";

export const getLectureData = async (lectureID:any) =>{
    try {
        const LectureQuizCollectionRef = `/lecturers/${lectureID}/quizSnippets`// the quiz snippets collection reference
        const quizSnippetsFromDB = await getDocs(collection(firestore,LectureQuizCollectionRef)) // get the quiz snippets  collection from database
                
         let snippets:any[] =[]
 
         // store all topics from the database into the questions array
         quizSnippetsFromDB.forEach((doc) => {
            snippets.push({ ...doc.data()})
         });

        //  console.log('snippets',snippets)
 
 
         return { //This will make sure the topics are available gloabally
             props:{
                lectureInfo:snippets.length!==0
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