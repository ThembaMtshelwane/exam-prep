import { Box, Button, Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, firestore } from '@/src/firebase/clientApp';
import {useRouter} from 'next/router'

// create
type TopicModalProps= {
  open: boolean    
  handleClose: ()=> void
};
let module_Name =''
let topic_Name =''

const TopicModal:React.FC<TopicModalProps> = (
  { open,
    handleClose 
  }  
) => {
const router = useRouter()
const [user] = useAuthState(auth)
const [topicName, setTopicName] = useState('')
const [module, setModule] = useState('')
const [numOfLOs, setNumOfLOs] = useState(4)
const [error, setError] = useState('')
const [LOList, setLOList] = useState([])
const [loading, setLoading] = useState(false)

const MIN_LEARNING_OBJECTIVES =4
const MAX_LEARNING_OBJECTIVES =8
const handleChange1 = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setTopicName(event.target.value)
  topic_Name = topicName
}

const handleModuleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setModule(event.target.value)
  module_Name = module
}

const handleChange2 = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setError('')
  setNumOfLOs(Number(event.target.value))

    if(Number(event.target.value)<4 || Number(event.target.value) >8){
      setError("Maximun is 8 and minimum is 4")
      return
    }
}

const handleLOList = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setLOList(prev =>({
    ...prev,
    [event.target.name]: event.target.value
}))
}

// () => {}
const handleCreateQuiz = async () => {
  //Validate the quiz topic name
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (format.test(module)) {
    setError('Topic names must only contain letters or numbers.')
    return
  }

  if (format.test(topicName) || topicName.length<3) {
    setError('Topic names must be 3-21 characters, and can only contain letters, numbers or underscores')
    return
  }

  setLoading(true)
  try {
      //Create the quiz document in firestore
    // - check if unique
    const topicsDocRef= doc(firestore, 'topics', topicName)

    await runTransaction(firestore,async (transaction) => {
      const topicDoc = await transaction.get(topicsDocRef)
      if(topicDoc.exists()){
        throw new Error('Sorry, topic name is already taken. Try another.')
      }

      //- if valid create quiz
      transaction.set(topicsDocRef,{
        creatorID : user?.uid,  //creator's ID= user ID
        courseCode: module,
        createdAt : serverTimestamp(), // created at == time stamp
        topicID: topicName,
        // Number of learing concepts
         numberOfLearningObjectives:numOfLOs,
         listOFLearningObjectives:LOList
      })

      // create quiz snipet for the user=lecture
      transaction.set(
        doc(firestore,`lecturers/${user?.uid}/quizSnippets`, topicName),{
        topicId : topicName,
        isModerator: true,
      })
      router.push(`topics/${topicName}`)
    })
    
  } catch (error:any) {
    console.log('handleCreateQuiz error ',error)
    setError(error.message)
    
  }
    setLoading(false)

}

return (
  <> 
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display='flex' flexDirection='column' padding={3} textAlign='center' mt={5} mb={0}>
            Create a new quiz
        </ModalHeader>
        <Box pl={3}  pr={3}>
          <ModalCloseButton />
          <ModalBody 
              display='flex' flexDirection='column' padding='10px 0px'
              justifyContent='center' pb={6}>

                <Text fontWeight={600} fontSize={12} mb={5}>All quizes must contain 16 questions</Text>

                <Text fontWeight={600} fontSize={15} mb={5}>Course code</Text>
                <Text
                 fontWeight={600} fontSize={15}>
                  <Input value={module} placeholder="ELEN123A" size='sm' mb={5} onChange={handleModuleChange}></Input>
                </Text>

                <Text fontWeight={600} fontSize={15}>Topic Name</Text>
                <Text
                 fontWeight={600} fontSize={15}>
                  <Input value={topicName} placeholder='General Knowledge' size='sm' mb={5} onChange={handleChange1}></Input>
                </Text>


                <Text fontSize='9pt' color='red'>{error}</Text>

                
                <Text fontWeight={600} fontSize={15}>Number of Learning Objectives (Between 4 and 8)</Text>
                <Text
                 fontWeight={600} fontSize={15}>
                  <Input value={numOfLOs} size='sm' name="numOfLOs"onChange={handleChange2}></Input>
                </Text>
                {(numOfLOs < MIN_LEARNING_OBJECTIVES || numOfLOs >MAX_LEARNING_OBJECTIVES) ? error : ''}


                <Text fontWeight={600} fontSize={15}  mt={5}>Enter Learning Obejectives</Text>
                { (numOfLOs < MIN_LEARNING_OBJECTIVES || numOfLOs >MAX_LEARNING_OBJECTIVES) ? "Invalid Learing Objectives" :
                    Array(+Number(numOfLOs))
                      .fill("")
                      .map((n, i) => {
                        return (
                            <div key={i*7} >
                              <Text fontWeight={600} fontSize={15}>
                                <Input mt={2} size='sm'placeholder={String(i+1)} name={String(i+1)} onChange={handleLOList}></Input>
                              </Text>   
                            </div>   
                        )
                        
                      })
                  }
          </ModalBody>
        </Box>

        <ModalFooter>
          <Button bg= "#265e9e" color="white" margin="2px" 
            onClick={handleCreateQuiz} isLoading={loading}
            >Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)
}

export {module_Name, topic_Name}

export default TopicModal;