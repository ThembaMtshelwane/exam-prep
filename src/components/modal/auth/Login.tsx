import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Input, Text} from '@chakra-ui/react';
import React,{useState} from 'react';
import {useSetRecoilState} from 'recoil'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/clientApp'
import {FIREBASE_ERRORS} from '../../../firebase/errors'

type LoginProps = {};

const Login:React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const [loginForm, setLoginForm] = useState({
        email:'',
        password:'',
    })
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,    
    ] = useSignInWithEmailAndPassword(auth)

    // When button is pressed call this fuction to send data to firestore
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        // Don't refresh form 
        event.preventDefault()

       signInWithEmailAndPassword(loginForm.email,loginForm.password)
    }

    // When user types the an input, update the state
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        //update form state
        setLoginForm(prev =>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return(
        <form onSubmit={onSubmit}>
            <Input name='email' placeholder='Email' type='email' mb={2}
             required onChange={onChange}/>

            <Input name='password' placeholder='password' type='password' mb={2}
             required onChange={onChange} />

            {/* -----Possible Errors------- */}
            <Text textAlign='center' color='red' fontSize='10pt'> 
                {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>

            <Button bg= "#265e9e" color="white" mb={2} mt={2} type='submit'
              width='100%' isLoading={loading}
              >Log In</Button>

              <Flex fontSize='9pt' justifyContent='center'>
                <Text color='blue.500' fontWeight={700} cursor='pointer'
                onClick={()=> 
                    setAuthModalState((prev)=>({
                        ...prev,
                        view:"register",
                    })
                )}
                >Register an account</Text>               
              </Flex>
        </form>
    ) 
}
export default Login;