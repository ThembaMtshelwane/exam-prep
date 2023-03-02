import { authModalState } from '@/src/atoms/authModalAtom';
import { Input, Button, Flex,Text } from '@chakra-ui/react';
import React ,{useState} from 'react';
import {useSetRecoilState} from 'recoil'

const Register:React.FC = () => {
    
    const setAuthModalState = useSetRecoilState(authModalState)
    const [registerForm, setRegisterForm] = useState({
        email:'',
        password:'',
        confirmPassword:'',
    })

    // When button is pressed call this fuction to send data to firestore
    const onSubmit = () =>{}

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
            <Input name='email' placeholder='Email' type='email' mb={2}
             required onChange={onChange}/>

            <Input name='password' placeholder='Password' type='password' mb={2}
             required onChange={onChange} />

            <Input name='confirmPassword' placeholder='Confirm Password' type='confirmPassword' mb={2}
             required onChange={onChange} />

            <Button bg= "#265e9e" color="white" mb={2} mt={2} type='submit'
              width='100%'
              >Register</Button>

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
