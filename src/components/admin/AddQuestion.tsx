import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList,Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, firestore } from '@/src/firebase/clientApp';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { module_Name, topic_Name } from '../modal/topic/TopicModal';
type AddQuestionProps = {

};


const AddQuestion:React.FC<AddQuestionProps> = (
  
) => {
  const [user] = useAuthState(auth)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [qid, setQuestionID] = useState('')
  const [options, setOptions] = useState([])
  const [levelNum, setLevel] = useState(0)
  const [numResources, setNumResources] = useState(0)
  const [resourcelist, setResourceList] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [error, setError] = useState('')

  const handleLevelChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setError('')
    setLevel(Number(event.target.value))
  
    if(Number(event.target.value)<1 || Number(event.target.value) >4){
      setError("Maximun is 4 and minimum is 1")
      return
    }
  }

  const handleIDChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setQuestionID(event.target.value)
  }

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
    setResourceList(prev =>({
      ...prev,
      [event.target.name]: event.target.value
  }))
  }

  const handleAnswerChange= (event:React.ChangeEvent<HTMLInputElement>) =>{
    setAnswer(event.target.value)
  }

  const handleOptions = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setOptions(prev =>({
      ...prev,
      [event.target.name]: event.target.value
  }))
  }

  const handleCreateQuestion = async () =>{
    setLoading(true)
    try {
      setError('')
        //Create the quiz document in firestore
      // - check if unique
      const questionsDocRef= doc(firestore, 'topics/Fractions/questions',qid) //questionName
      const questionDoc = await getDoc(questionsDocRef)
  
      if(questionDoc.exists()){
        throw new Error('Sorry, question already exsists. Try another.')
      }
  
      //- if valid create quiz
      await setDoc(questionsDocRef,{
        creatorID : user?.uid,  //creator's ID= user ID
        createdAt : serverTimestamp(), // created at == time stamp

        questionID: qid,
        questionLevel: levelNum,
        questionOptions:options,
        questionAnswer:answer,
        questionResources: resourcelist,
        question
      })
      
    } catch (error:any) {
      console.log('handleCreateQuiz error ',error)
      setError(error.message)
      
    }
      setLoading(false)
  }


  return (

      <>
    {/* // Question level */}
    <Text fontWeight={600} fontSize={15}>Level</Text>
    <Text
     fontWeight={600} fontSize={15}>
      <Input value={levelNum} size='sm' placeContent='1' onChange={handleLevelChange} mb={15}></Input>
    </Text>

    {(Number(levelNum) < 1 || Number(levelNum) >8) ? error : ''} 

    <Text fontWeight={600} fontSize={15}>Question ID</Text>
    <Text fontWeight={600} fontSize={12}>
      The main question (level 1 question) will have an id of 1 
      The secondary questions (level 2 question) will have ids 1.1 and 1.2, the following
      level questions will have an ID of 1.1.1, 1.1.2, 1.2.1 and 1.2.2
    </Text>
    <Text
     fontWeight={600} fontSize={15}>
      <Input value={qid} size='sm'placeholder='1.1.1'  onChange={handleIDChange} 
      mb={15} name='questionID'></Input>
    </Text>

    <Text fontWeight={600} fontSize={15}>Question text</Text>
    <Text
     fontWeight={600} fontSize={15}>
      <Input value={question} size='sm'placeholder='What is the colour of the sky?'  onChange={handleQuestionChange} 
      mb={15} name='questionText'></Input>
    </Text>

    {/* // Question - Have a choice between text, images and a pdf file */}
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} cursor='pointer'>
          Question type
      </MenuButton>
      <br />
      <MenuList>
           <MenuItem 
              onClick={()=>{}}>  {/* Handle Text */}
              Text
            </MenuItem>  
           <MenuDivider/>
           <MenuItem 
              onClick={()=>{}}>  {/* Handle images */}
              Image
            </MenuItem>    
           <MenuDivider/>  
           <MenuItem 
              onClick={()=>{}}>  {/* Handle PDF files */}
              PDF
           </MenuItem>     
      </MenuList>
    </Menu>
 <br />
    {/* // Enter the answer */}
    <Text fontWeight={600} fontSize={15}>Answer</Text>
    <Text fontWeight={600} fontSize={15}> 
          <Input value={answer} size='sm' name='answer' onChange={handleAnswerChange} ></Input> </Text>

    <br />
    {/* //  Drop down to enter the 4 options  */}
    <Text fontWeight={600} fontSize={15}>Options</Text>
    { Array(+4).fill("").map((n, i) => {
        return (
         <Text
            fontWeight={600} fontSize={15}>
            <Input mt={2} size='sm'placeholder={String(i+1)}
            name={String(i+1)} onChange={handleOptions}>

            </Input>
          </Text>
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
<Button bg= "#265e9e" color="white" margin="2px" 
            onClick={handleCreateQuestion} isLoading={loading}
            >Next
          </Button>

</>

)

}
export default AddQuestion;