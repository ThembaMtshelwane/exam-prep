import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, Flex,Text,Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {useRecoilState} from 'recoil'
import { topicModalState } from '@/src/atoms/topicModalAtom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import TopicInputs from './TopicsInput';

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
const [modalState, setModalState] = useRecoilState(topicModalState)
const [user, loading, error] = useAuthState(auth)

useEffect(() =>{
    if(user) handleClose()
}, [user])
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
                <Text fontWeight={600} fontSize={15}>Topic Name</Text>
                
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  </>
)
}
export default TopicModal;