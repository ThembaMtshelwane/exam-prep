import { Input, Button, Flex,Text } from '@chakra-ui/react';
import React ,{useState} from 'react';
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/clientApp'
import {FIREBASE_ERRORS} from '../../../firebase/errors'
import {useRouter} from 'next/router'

const Register:React.FC = () => {
    const router = useRouter()
    const setAuthModalState = useSetRecoilState(authModalState)
    const [registerForm, setRegisterForm] = useState({
        email:'',
        password:'',
        confirmPassword:'',
    })
    const [error, setError] = useState('')
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,    
    ] = useCreateUserWithEmailAndPassword(auth)

    // When button is pressed call this fuction to send data to firestore
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        // Don't refresh form 
        event.preventDefault()
        // Rest the error 
        if(error) setError('') 

        //Check email domain = Must contain @students.wits.ac.za

        //Check password
        if(registerForm.password !== registerForm.confirmPassword){
            //set error
            setError('Passwords do not match')
            return
        }
        createUserWithEmailAndPassword(registerForm.email,registerForm.password)
        router.push('/dashboard')
    }

    // When user types the an input, update the state
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        //update form state
        setRegisterForm(prev =>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return(
        <form onSubmit={onSubmit}>

            {/* -----User Input------- */}
            <Input name='email' placeholder='Email' type='email' mb={2}
             required onChange={onChange}/>

            <Input name='password' placeholder='Password' type='password' mb={2}
             required onChange={onChange} />

            <Input name='confirmPassword' placeholder='Confirm Password' type='password' mb={2}
             required onChange={onChange} />


            {/* -----Possible Errors------- */}
            <Text textAlign='center' color='red' fontSize='10pt'> 
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>

            {/* ----- Register/Signin Button------- */}
            <Button bg= "#265e9e" color="white" mb={2} mt={2} type='submit'
              width='100%' isLoading={loading}
              >Register
            </Button>

             {/* ----- Alternative Text ------- */}
            <Flex fontSize='9pt' justifyContent='center'>
                <Text>Already have an account? </Text>
                <Text color='blue.500' fontWeight={700} cursor='pointer'
                onClick={()=> 
                    setAuthModalState((prev)=>({
                        ...prev,
                        view:"login",
                    })
                )}
                > Log in</Text>               
            </Flex>

        </form>
    ) 
}
export default Register;
