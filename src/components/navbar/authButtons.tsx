import React from 'react';
import { Button } from '@chakra-ui/react';
import authModal from '../modal/auth/authModal'



const AuthButtons:React.FC = () => {
    return (
        <>
            <authModal/>
            <Button 
                bg= "#265e9e"
                color="white"
                margin="2px"
                // onClick={()=>{}}

            >Login</Button>

            <Button
                bg= "#265e9e"
                color="white" 
                margin="2px"

            >Register</Button>
        </>
    ) 
}
export default AuthButtons;