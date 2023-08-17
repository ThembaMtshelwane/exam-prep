import { Button, Flex, Heading, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList,Text, VisuallyHidden,Image } from '@chakra-ui/react';
import React, {useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, firestore, storage } from '@/src/firebase/clientApp';
import {ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';

type AddQuestionProps = {
  topicID:string,
};


const AddQuestion:React.FC<AddQuestionProps> = ({topicID}) => {
  const [user] = useAuthState(auth)
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [qid, setQuestionID] = useState<string>('1');
  const [options, setOptions] = useState<any[]>([])

  const [option1, setOption1] = useState<string>('')
  const [option2, setOption2] = useState<string>('')
  const [option3, setOption3] = useState<string>('')
  const [option4, setOption4] = useState<string>('')

  const [levelNum, setLevel] = useState<number>(1);
  const [numResources, setNumResources] = useState<number>(0)
  const [count, setCount] =useState<number>(0);
  const [levelText, setLevelText] = useState<string>('');
  const [isAddingQuestions, setIsAddingQuestions] = useState<boolean>(true);
  
  const [resourcelist, setResourceList] = useState<any[]>([])

  const [resource1, setResource1] = useState<string>('');
  const [resource2, setResource2] = useState<string>('');
  const [resource3, setResource3] = useState<string>('');
  const [resource4, setResource4] = useState<string>('');

  const [isUploadFile, setIsUploadFile] = useState(false)
  const [fileUpload, setFileUpload] = useState<any>(null)
  const [fileLink, setFileLink] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [goToNext, setGoToNext] = useState<boolean>(false)
  
  const [error, setError] = useState<string>('')

  const levelOne = ['1']
  const levelTwo = ['1.1','1.2']
  const levelThree = ['1.1.1','1.1.2','1.2.1','1.2.2']
  const levelFour = ['1.1.1.1', '1.1.1.2', '1.1.2.1', '1.1.2.2', '1.2.1.1', '1.2.1.2', '1.2.2.1', '1.2.2.2']
  const quizLevelCount : string[][]= [levelOne,levelTwo,levelThree,levelFour]

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

  const handleResourceChange1 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setResource1( event.target.value)
  }
  const handleResourceChange2 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setResource2( event.target.value)
  }
  const handleResourceChange3 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setResource3( event.target.value)
  }
  const handleResourceChange4 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setResource4( event.target.value)
  }

  const handleAnswerChange= (event:React.ChangeEvent<HTMLInputElement>) =>{
    setAnswer(event.target.value)
  }

  // const handleOptions = (event:React.ChangeEvent<HTMLInputElement>) =>{
  //   setOptions(prev =>[prev, event.target.value])
  // }
  const handleOption1 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setOption1(event.target.value)
  }
  const handleOption2 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setOption2(event.target.value)
  }
  const handleOption3 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setOption3(event.target.value)
  }
  const handleOption4 = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setOption4(event.target.value)
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
        questionOptions:[option1,option2,option3,option4],
        questionAnswer:answer,
        questionResources: [resource1,resource2,resource3,resource4],
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
      setGoToNext(true)


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
    setGoToNext(false)
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
         <input type="file"  onChange={(event)=>{
            if(event.target.files === null){
              console.log('No file selected')
            }else{
              setFileUpload(event.target.files[0])
            }
            }}/>
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

     <Input mt={2} size='sm'placeholder='Orange'
               name='A' onChange={handleOption1}>
     </Input>

     <Input mt={2} size='sm'placeholder='Yellow'
               name='B' onChange={handleOption2}>
     </Input> 

      <Input mt={2} size='sm'placeholder='Blue'
               name='C' onChange={handleOption3}>
      </Input>
 
      <Input mt={2} size='sm'placeholder='Green'
               name='D' onChange={handleOption4}>
      </Input>

     <Text fontSize='9pt' color='red'>{error}</Text>

     {/* // if level is 4  show
     // Enter number of resources  */}
     {!(levelNum === 4) ? "" : 
         <>
         <Text fontWeight={600} fontSize={15}>Number of Resources</Text>
         <Input value={numResources} size='sm' onChange={handleNumResourceChange}></Input>
         </>
     }  

     {/* // Enter said resource */}
     { ( (!(levelNum === 4)) && !(numResources>=1 && numResources<=4) ) ? "" : 
         Array(+Number(numResources))
           .fill("")
           .map((n, i) => {
             return (
              <>
                {i===0?
                   <>
                    <Text fontWeight={600} fontSize={15}>  Resource </Text>                
                    <Input mt={2} size='sm' placeholder={`Link ${String(i+1)}`} 
                    onChange={handleResourceChange1} name={String(i+1)}></Input>
                    </>
                :""}
                {i===1?
                   <>
                    <Text fontWeight={600} fontSize={15}>  Resource </Text>                
                    <Input mt={2} size='sm' placeholder={`Link ${String(i+1)}`} 
                    onChange={handleResourceChange2} name={String(i+1)}></Input>
                    </>
                :""}
                  {i===2?
                   <>
                    <Text fontWeight={600} fontSize={15}>  Resource </Text>                
                    <Input mt={2} size='sm' placeholder={`Link ${String(i+1)}`} 
                    onChange={handleResourceChange3} name={String(i+1)}></Input>
                    </>
                :""}
                  {i===3?
                   <>
                    <Text fontWeight={600} fontSize={15}>  Resource </Text>                
                    <Input mt={2} size='sm' placeholder={`Link ${String(i+1)}`} 
                    onChange={handleResourceChange4} name={String(i+1)}></Input>
                    </>
                :""}                
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
      
     
     {levelNum<=4 ?
        goToNext?
        <Button bg= "#265e9e" color="white" margin="2px"  onClick={nextQuestion} isLoading={loading}>
          Next
        </Button>
        :''
     :
     <a href={'/dashboard'}>
        <Button bg= "#265e9e" color="white" margin="2px" isLoading={loading}>
          BACK
        </Button>
     </a>
      }

    </Flex>
   
</>

)

}
export default AddQuestion;