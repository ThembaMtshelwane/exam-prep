import { FIREBASE_ERRORS } from '@/src/firebase/errors';
import { Input, Button, Flex ,Text, Divider} from '@chakra-ui/react';
import React,{useState} from 'react';
import {useSetRecoilState} from 'recoil'
import { topicModalState } from '@/src/atoms/topicModalAtom';

type AddTopicProps = {
    
};

const AddTopic:React.FC<AddTopicProps> = () => {
    const setTopicModalState = useSetRecoilState(topicModalState)
    const [topicForm, setTopicForm] = useState({
        Topic:'',
        numberOfLearningObjectives:0,
        listOfLearningObjects:[]
    })
    const [error, setError] = useState('')

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        // Don't refresh form 
        event.preventDefault()
        // Reset the error 
        if(error) setError('') 

        if(topicForm.Topic === ''){
            setError('Invalid topic')
            return
        }
        if(topicForm.numberOfLearningObjectives > 8 || topicForm.numberOfLearningObjectives <4  ){
            setError('Mimimun is 4 and Maximum is 8')
            return
        }
        if(topicForm.listOfLearningObjects.length === 0){
            setError('Fill in all learning onbjectives ')
            return
        }

        // send to dababase
        // topicForm.Topic,topicForm.listOfLearningObjects, topicForm.numberOfLearningObjectives
    }

    // When user types the an input, update the state
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            //update form state
            setTopicForm(prev =>({
                ...prev,
                [event.target.name]: event.target.value
            }))
    }

    return (    
    // Drop down to enter the text of those LOs

    <form onSubmit={onSubmit}>
    {/* // Set topic */}
    <Input name='topic' placeholder='Topic' type='text' mb={2}
     required onChange={onChange}/>

    {/*Enter number of LOs */}
    <Input name='numOfLOs' placeholder='Number of Learning objectives' type='number' mb={2}
     required onChange={onChange} />

    {/*Enter LOs */}

     {/* -----Possible Errors-------
     <Text textAlign='center' color='red' fontSize='10pt'> 
       { if(error ==! ''){error} }
     </Text> */}

    <Button bg= "#265e9e" color="white" mb={2} mt={2} type='submit'
      width='100%'
     >Continue</Button>
</form>
    )
}
export default AddTopic;