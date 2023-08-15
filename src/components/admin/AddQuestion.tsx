import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList,Text, VisuallyHidden,Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, firestore, storage } from '@/src/firebase/clientApp';
import {ref, uploadBytes,listAll,getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

type AddQuestionProps = {
  topicID:string,
};


const AddQuestion:React.FC<AddQuestionProps> = ({topicID}) => {
  const [user] = useAuthState(auth)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [qid, setQuestionID] = useState<string>('1');
  const [options, setOptions] = useState<any[]>([])
  const [levelNum, setLevel] = useState<number>(1);
  const [numResources, setNumResources] = useState(0)
  const [count, setCount] =useState<number>(0);
  const [levelText, setLevelText] = useState<string>('');
  const [isAddingQuestions, setIsAddingQuestions] = useState<boolean>(true);
  const [resourcelist, setResourceList] = useState<any[]>([])

  const [isUploadFile, setIsUploadFile] = useState(false)
  const [fileUpload, setFileUpload] = useState(null)
  const [fileLink, setFileLink] = useState('')

  const [loading, setLoading] = useState(false)
  
  const [error, setError] = useState('')

  const levelOne = ['1']
  const levelTwo = ['1.1','1.2']
  const levelThree = ['1.1.1','1.1.2','1.2.1','1.2.2']
  const levelFour = ['1.1.1.1', '1.1.1.2', '1.1.2.1', '1.1.2.2', '1.2.1.1', '1.2.1.2', '1.2.2.1', '1.2.2.2']
  const quizLevelCount : string[][]= [levelOne,levelTwo,levelThree,levelFour]
  let counting =1

  const handleQuestionChange =(event:React.ChangeEvent<HTMLInputElement>) =>{
    setQuestion(event.target.value)
  }

  const handleNumResourceChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setError('')
    setNumResources(Number(event.target.value))
    if(Number(event.target.value)<1 || Number(event.target.value) >4){
      setError("Maximun is 4 and minimum is 1")
      return
    }
  }

  const handleResourceChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setResourceList(prev =>[...prev, event.target.value])
  }

  const handleAnswerChange= (event:React.ChangeEvent<HTMLInputElement>) =>{
    setAnswer(event.target.value)
  }

  const handleOptions = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setOptions(prev =>[...prev, event.target.value])
  }

  const handleFileUpload =() =>{
    setIsUploadFile(true)
  }
  const handleFileUploadClose =() =>{
    setIsUploadFile(false)
  }

  const uploadFile=()=>{
    if(fileUpload===null) return

    const fileRef = ref(storage,`questionFiles/${topicID}/${qid}`)
    uploadBytes(fileRef,fileUpload)
    .then(()=>{
      alert('file uploaded')
      getDownloadURL(fileRef).then((url)=>{
        setFileLink(url.toString())
        console.log('file link url',url)
        console.log('file link',fileLink)
      })
    })
  }

  const handleCreateQuestion = async () =>{
    setLoading(true)
    try {
      setError('')
        //Create the quiz document in firestore
      // - check if unique
      const questionsDocRef= doc(firestore, `topics/${topicID}/questions`,qid) //questionName
      const questionDoc = await getDoc(questionsDocRef)
  
      if(questionDoc.exists()){
        throw new Error('Sorry, question already exsists. Try another.')
      }
  
      //- if add a question
      await setDoc(questionsDocRef,{
        questionID: qid,
        questionLevel: levelNum,
        questionOptions:options,
        questionAnswer:answer,
        questionResources: resourcelist,
        fileURL: fileLink,
        question,
      })
      // questionCounter = questionCounter +1
      // console.log('question counter ', questionCounter)
      
    } catch (error:any) {
      console.log('handleCreateQuiz error ',error)
      setError(error.message)
    }
      setLoading(false)


      if (count+1 === quizLevelCount[levelNum-1].length) {
        setCount(0)
        setLevel(levelNum+1)
        setLevelText('The next level is')
        setIsAddingQuestions(false)
      } else {
        setCount(count+1)
        setLevelText('')
        setIsAddingQuestions(true)
      }
  }

  const nextQuestion = ()=>{
    if(levelNum>4){
      setLevelText('QUIZ COMPLETE AT LEVEL ')
      return
    }
    setQuestionID(quizLevelCount[levelNum-1][count])
    setIsAddingQuestions(true)
  }

  return (

      <>
    <Flex direction='column' p={5}>

      <Heading> Create a {topicID} quiz </Heading>
 
      <Text fontWeight={600} fontSize={15}>Instructions</Text>
      <Text fontWeight={600} fontSize={12}>
        The main question (level 1 question) will have an id of 1 
        The secondary questions (level 2 question) will have ids 1.1 and 1.2, the following
        level questions will have an ID of 1.1.1, 1.1.2, 1.2.1 and 1.2.2
      </Text>

      <Image
        objectFit='cover'
        src='/images/exam-prep-student-id-labelling.PNG'
        alt='Id Labelling'
      />
     
     {isAddingQuestions && levelNum<=4 ? 
      <div>
          <Text fontWeight={600} fontSize={15}>You are now adding question {qid} in level {levelNum} </Text>

          <Text fontWeight={600} fontSize={15}>Question (Text is the default)</Text>
     
     <Text fontWeight={600} fontSize={15}>
       <Input value={question} size='sm'placeholder='What is the colour of the sky?'  onChange={handleQuestionChange} 
       mb={15} name='questionText'></Input>
     </Text>
    
     <Button onClick={handleFileUpload}>Add File</Button>
    
     {!isUploadFile ?'' :
       <>
         <input type="file"  onChange={(event)=>{setFileUpload(event.target.files[0])}}/>
         <Flex>
            <Button onClick={uploadFile}>Upload File</Button>
            <Button onClick={handleFileUploadClose}>Close</Button>
         </Flex>
        
       </>
     }

     {/* // Enter the answer */}
     <Text fontWeight={600} fontSize={15}>Answer</Text>
     <Text fontWeight={600} fontSize={15}> 
           <Input value={answer} size='sm' name='answer' onChange={handleAnswerChange} ></Input> </Text>

     <br />
     {/* //  Drop down to enter the 4 options  */}
     <Text fontWeight={600} fontSize={15}>Options</Text>
     { Array(+4).fill("").map((n, i) => {
         return (
           <>
         <div key={i*7} ></div>
          <Text
             fontWeight={600} fontSize={15}>
             <Input mt={2} size='sm'placeholder={String(i+1)}
             name={String(i+1)} onChange={handleOptions}>

             </Input>
           </Text>
           
           </>
         )
        })
     }

     <Text fontSize='9pt' color='red'>{error}</Text>

     {/* // if level is 4  show
     // Enter number of resources  */}
     {!(levelNum === 4) ? "" : 
         <>
         <Text fontWeight={600} fontSize={15}>Number of Resources</Text>
         <Text
            fontWeight={600} fontSize={15}>
           <Input value={numResources} size='sm' onChange={handleNumResourceChange}></Input>
         </Text>
         </>
     }  

     {/* // Enter said resource */}
     { ( (!(levelNum === 4)) && !(numResources>=1 && numResources<=4) ) ? "" : 
         Array(+Number(numResources))
           .fill("")
           .map((n, i) => {
             return (
               <>
               <div key={i*8} ></div>
              <Text
              fontWeight={600} fontSize={15}>
               Resource
              </Text>
              <Text
              fontWeight={600} fontSize={15}>
              <Input mt={2} size='sm' placeholder={`Link ${String(i+1)}`} 
              onChange={handleResourceChange} name={String(i+1)}></Input>
              </Text>
               </>

             )
           })
       }

     {/* Sumbit */}
     <Button bg= "#265e9e" color="white" margin="2px"  onClick={handleCreateQuestion} isLoading={loading}>
       Submit
     </Button>
      </div>

      
      
      :levelNum<=4 ? <Text fontWeight={600} fontSize={15}> The next level is {levelNum} </Text>
          :<Text fontWeight={600} fontSize={15}> QUIZ COMPLETE</Text>
      
     }
      
     
     
      <Button bg= "#265e9e" color="white" margin="2px"  onClick={nextQuestion} isLoading={loading}>
        Next
      </Button>

      {/* {!(questionCounter === 16) ? "" : 
          <>
            <Button bg= "#265e9e" color="white" margin="2px" onClick={returnToDasboard} isLoading={loading}>
              Done
            </Button>
          </>
      }  */}

    </Flex>
   
</>

)

}
export default AddQuestion;