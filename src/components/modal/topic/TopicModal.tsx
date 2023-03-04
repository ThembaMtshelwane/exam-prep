import { Box, Button, Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text } from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, firestore } from '@/src/firebase/clientApp';

type TopicModalProps= {
  open: boolean    
  handleClose: ()=> void
};

// Create
const TopicModal:React.FC<TopicModalProps> = (
  { open,
    handleClose 
  }  
) => {
const [user] = useAuthState(auth)
const [topicName, setTopicName] = useState('')
const [module, setModule] = useState('')
const [numOfLOs, setNumOfLOs] = useState(0)
const [error, setError] = useState('')
const [LOList, setLOList] = useState([])
const [loading, setLoading] = useState(false)

const handleChange1 = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setTopicName(event.target.value)
}

const handleModuleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setModule(event.target.value)
}

const handleChange2 = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setError('')

  if(Number(event.target.value)<4 || Number(event.target.value) >8){
    setError("Maximun is 8 and minimum is 4")
    return
  }
  setNumOfLOs(Number(event.target.value))
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
    setError('ModuTopic names must only contain letters, numbers or underscores')
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
    const topicDoc = await getDoc(topicsDocRef)

    if(topicDoc.exists()){
      throw new Error('Sorry, topic name is already taken. Try another.')
    }

    //- if valid create quiz
    await setDoc(topicsDocRef,{
      creatorID : user?.uid,  //creator's ID= user ID
      courseCode: module,
      createdAt : serverTimestamp(), // created at == time stamp
      // Number of learing concepts
       numberOfLearningObjectives:numOfLOs,
       listOFLearningObjectives:LOList
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

                <Text fontWeight={600} fontSize={15}>Course code</Text>
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

                
                <Text fontWeight={600} fontSize={15}>Number of Learning Objectives</Text>
                <Text
                 fontWeight={600} fontSize={15}>
                  <Input value={numOfLOs} size='sm' name="numOfLOs"onChange={handleChange2}></Input>
                </Text>
                {(numOfLOs < 4 || numOfLOs >8) ? error : ''}


                <Text fontWeight={600} fontSize={15}  mt={5}>Enter Learning Obejectives</Text>
                { (numOfLOs < 4 || numOfLOs >8) ? "Invalid Learing Objectives" :
                    Array(+Number(numOfLOs))
                      .fill("")
                      .map((n, i) => {
                        return (
                         <Text
                         fontWeight={600} fontSize={15}>
                         <Input mt={2} size='sm'placeholder={String(i+1)} name={String(i+1)} onChange={handleLOList}></Input>
                          </Text>
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
export default TopicModal;