import { topicState } from '@/src/atoms/topicsAtom';
import { auth } from '@/src/firebase/clientApp';
import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useResetRecoilState } from 'recoil';

type LogOutProps = {
    
};

const LogOut:React.FC<LogOutProps> = () => {
    const resetTopicState = useResetRecoilState(topicState)
    
    const logout = async() =>{
        await signOut(auth)
        resetTopicState()
    }
    return <Button bg="#265e9e" color="white" mb={2} mt={2} onClick={()=>signOut(auth)}>Logout</Button>
}
export default LogOut;