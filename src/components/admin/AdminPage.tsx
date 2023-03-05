import { Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import {GrAdd} from 'react-icons/gr'
import React,{useState} from 'react';
import TopicModal from '../modal/topic/TopicModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import useTopicData from '@/src/hooks/useTopicData';
import { stringify } from 'querystring';

type AdminPageProps = {
    
};
// COMUMNITIES
const AdminPage:React.FC<AdminPageProps> = () => {
    const [open, setOpen] = useState(false)
    const [user] = useAuthState(auth)
    const {topicStateValue, loading} = useTopicData()

    return (
        <>
            {/* Wkecome the lecturer */}
            <Heading p={5}> Welcome {user?.email}.  </Heading>

            <Text fontWeight={600} fontSize={15}>
            {/* Topic Name: {String(topicStateValue.mySnippets[1].topicID)} */}
            </Text>
  
            <TopicModal open={open} handleClose={()=> setOpen(false)} />
           
            <Flex align='center' justify='center' mt={5} fontWeight={600}>
                 
                 {/* // Add Quiz Button*/}
                    <Icon fontSize={20} mr={2} as={GrAdd} cursor='pointer'
                               onClick={()=> setOpen(true)} alignSelf='center'
                    />
                    <Text fontSize={15}>
                         Add Quiz     
                    </Text>
            </Flex>
            
            <Flex align='center' justify='center' flexDirection='column' mt='20px'>
                <Text fontWeight={600} fontSize={15}>Previously Made Quizes (Demo)</Text>

                <Stack spacing={2}>
                    { 
                        Array(+topicStateValue.mySnippets.length)
                          .fill("")
                          .map((n, i) => {
                                return (
                                  <>
                                  <div key={i*7} >
                                    <Flex direction='column' border='2px'p={2} borderColor='#265e9e' borderRadius='10px' cursor='pointer' >
                                        <Text fontWeight={600} fontSize={15}>
                                        Topic Name: {String(topicStateValue.mySnippets[i].topicID)}
                                        </Text>
                                    </Flex>
                                  </div>

                                  </>
                                )
                            })
                    }

                </Stack>
                    <br />
            </Flex>

               
            

            
        </>
    )
}
export default AdminPage;