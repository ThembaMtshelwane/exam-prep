import { Box, Input, Modal, ModalBody, ModalCloseButton,
         ModalContent, ModalHeader, ModalOverlay,
         Text } from '@chakra-ui/react';
import React, { useState } from 'react';


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
const [topicName, setTopicName] = useState('')
const [numOfLOs, setNumOfLOs] = useState(0)
const [error, setError] = useState('')

const handleChange1 = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setTopicName(event.target.value)
}

const handleChange2 = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setError('')
  setNumOfLOs(Number(event.target.value))

  if(Number(event.target.value)<4 || Number(event.target.value) >8){
    setError("Maximun is 8 and minimum is 4")
    return
  }
}

// useEffect(() =>{
//     if(user) handleClose()
// }, [user])
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

                <Text fontWeight={600} fontSize={15}>Topic Name</Text>
                <Text
                 fontWeight={600} fontSize={15}>
                  <Input value={topicName} size='sm' mb={5} onChange={handleChange1}></Input>
                </Text>
                
                <Text fontWeight={600} fontSize={15}>Number of Learning Objectives</Text>
                <Text
                 fontWeight={600} fontSize={15}>
                  <Input value={numOfLOs} size='sm' onChange={handleChange2}></Input>
                </Text>
                {(Number(numOfLOs) < 4 || Number(numOfLOs) >8) ? error : ''}

                <Text fontWeight={600} fontSize={15}  mt={5}>Enter Learning Obejectives</Text>
                { (Number(numOfLOs) < 4 || Number(numOfLOs) >8) ? "Invalid Learing Objectives" :
                    Array(+Number(numOfLOs))
                      .fill("")
                      .map((n, i) => {
                        return (
                         <Text
                         fontWeight={600} fontSize={15}>
                         <Input mt={2} size='sm'placeholder={String(i+1)}></Input>
                          </Text>
                        )
                      })
                  }

                


          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  </>
)
}
export default TopicModal;