import { Button, Flex, Image,Spacer } from '@chakra-ui/react';
import {auth} from '../../firebase/clientApp'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthButtons from './authButtons';
import { signOut } from 'firebase/auth';

// Navigation bar

const NavBar:React.FC= () => {
    const [user,loading,error] = useAuthState(auth)

   return (
    // nav background and colour -layout
    <Flex bg='white' height="44px" padding="6px 12px" >

        {/* logo entity in the nav bar}
        <Flex>
            <Image src='/images/logo.svg'/>
        </Flex>
         */}

         {/* Login and Sign in buttons */}
         <Spacer />

        <Flex justify='end' align = 'center'>
            {user? <Button bg="#265e9e" color="white" mb={2} mt={2} onClick={()=>signOut(auth)}>Logout</Button>:<AuthButtons/>}
        </Flex>
    </Flex>
   ) 
}
export default NavBar;