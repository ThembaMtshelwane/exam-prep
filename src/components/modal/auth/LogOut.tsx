import { topicState } from '@/src/atoms/topicsAtom';
import { auth } from '@/src/firebase/clientApp';
import { Button,Link } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import {useRouter} from 'next/router'

type LogOutProps = {
    
};

const LogOut:React.FC<LogOutProps> = () => {
    const resetTopicState = useResetRecoilState(topicState)
    const router = useRouter()

    const logout = async() =>{
        await signOut(auth)
        resetTopicState()
    }
    return (
        <Link href='/'> 
                <Button bg=" #11355e" color="white" mb={2} mt={2} onClick={logout}>
                   Logout
                </Button>
        </Link>
    )
   
}
export default LogOut;