import { Box, Button, Flex, Heading, Icon, Link, List, ListItem, Stack, Text } from '@chakra-ui/react';
import {GrAdd} from 'react-icons/gr'
import React,{useEffect, useState} from 'react';
import TopicModal from '../modal/topic/TopicModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import { TopicSnippet } from '@/src/atoms/topicsAtom';
import { getLectureData } from '@/src/pages/api/LectureData';

type AdminPageProps = {
    
};
// COMUMNITIES
const AdminPage:React.FC<AdminPageProps> = () => {
    const [open, setOpen] = useState(false)
    const [user] = useAuthState(auth)

    const [loading, setLoading] = useState(false)
    const [lectureData, setLectureData] = useState<TopicSnippet[]>([]);

    useEffect(() => {
      const fetchLectureData = async () => {
        const data = await getLectureData(user?.uid);
        setLectureData(data?.props.lectureData);
      };
      fetchLectureData();
    }, []);

    console.log('lecture',lectureData)

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


                <List width='100%'>
                <Stack spacing={2}>
                    { lectureData.length!=0 ?                        
                        lectureData.map((prevID:TopicSnippet,index:number) => (
                            <ListItem key={index}> 
                              {/* <Link href={`quiz/${prevID.topicID}`}> */}
                                <Button fontWeight={700} bg='white' boxShadow='1px 1px 1px 2px rgba(97, 143, 217, .75)'p='10px'
                                  _hover={{ bg:'#265e9e', color:'white',transform: 'scale(0.98)'}}
                                  isLoading={loading} width='95%' height='50%' borderRadius={0}
                                >
                                  <Flex direction='column'>
                                    <Text >Topic: {prevID.topicID}</Text>
                                    {/* <Text>Created At: {prevID.createdAt}</Text> */}
                                  </Flex> 
                                </Button>
                              {/* </Link> */}
                            </ListItem>
                          )):
                          <Flex direction='column'>
                            <Text >No Available Quiz</Text>
                          </Flex> 
                    }

                </Stack>
                </List>
                    <br />
            </Flex>

               
            

            
        </>
    )
}
export default AdminPage;