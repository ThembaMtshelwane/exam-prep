import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import {GrAdd} from 'react-icons/gr'
import React,{useState} from 'react';
import TopicModal from '../modal/topic/TopicModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';

type AdminPageProps = {
    
};
// COMUMNITIES
const AdminPage:React.FC<AdminPageProps> = () => {
    const [open, setOpen] = useState(false)
    const [user] = useAuthState(auth)

    return (
        <>
            {/* Wkecome the lecturer */}
            <Text fontSize={20} fontWeight={600} padding={5}>Welcome {user?.email}.</Text>
  
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
                {
                    <Stack spacing={2}>
                        <Box>
                        <Flex direction='column' border='2px'p={2} borderColor='#265e9e' borderRadius='10px' cursor='pointer'>
                                <Text>Topic Name: Magenestism</Text>
                                <Text>Description:</Text>
                                <Text>Module: PHYS1000</Text>
                            </Flex>
                        </Box>

                        <Box>
                        <Flex direction='column' border='2px'p={2} borderColor='#265e9e' borderRadius='10px'>
                                <Text>Topic Name: Electrostatic</Text>
                                <Text>Description:</Text>
                                <Text>Module: PHYS1000</Text>
                            </Flex>
                        </Box>

                         <Box>
                         <Flex direction='column' border='2px'p={2} borderColor='#265e9e' borderRadius='10px'>
                                <Text>Topic Name: Integration</Text>
                                <Text>Description:</Text>
                                <Text>Module: MATH1000</Text>
                            </Flex>
                        </Box>
                        
                    </Stack>
                /*  List
                        Topic Name
                        Topic Description                
                */}
            </Flex>

               
            

            
        </>
    )
}
export default AdminPage;