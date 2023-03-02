import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import React from 'react';
import {useRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom';
import AuthInputs from './authInputs';

const AuthModal:React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)
    
    const handleClose =()=>{
        setModalState(prev=>({
            ...prev,
            open:false
        }))
    }
    return (
      <> 
        <Modal isOpen={modalState.open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign='center'>
                {modalState.view === 'login' && 'Login'}
                {modalState.view === 'register' && 'Register an Account'}
                {modalState.view === 'resetPassword' && 'Reset your password'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody 
                display='flex' flexDirection='column' alignItems='center'
                justifyContent='center' pb={6}>

                    <Flex direction='column' align='center' justify='center' width='70%'>
                        {/* <OAuthButtons/> */}
                        <AuthInputs/>
                        {/* <ResetPassword/> */}
                    </Flex>

            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}
export default AuthModal;