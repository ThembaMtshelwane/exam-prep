import React from 'react';
import { Button } from '@chakra-ui/react';
import AuthModal from '../modal/auth/authModal';
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom';

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
        <>
            <AuthModal/>
            <Button 
                bg= "#265e9e"
                color="white"
                margin="2px"
                onClick={()=> setAuthModalState({open:true, view:"login"})}
            >Login</Button>

            <Button
                bg= "#265e9e"
                color="white" 
                margin="2px"
                onClick={()=> setAuthModalState({open:true, view:"register"})}
            >Register</Button>
        </>
    ) 
}
export default AuthButtons;