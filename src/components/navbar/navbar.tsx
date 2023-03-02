import { Flex, Image,Spacer } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './authButtons';

// Navigation bar

const NavBar:React.FC= () => {
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
        <Flex justify='end' align = 'center' >
            <AuthButtons/>
        </Flex>



    </Flex>
   ) 
}
export default NavBar;