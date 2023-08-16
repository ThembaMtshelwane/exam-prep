import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { getQuestion } from '../../api/QuestionData';
import { Box, ListItem, Stack, List,Text, Heading, Button, Link ,Image} from '@chakra-ui/react';
import PageContent from '@/src/components/layout/PageContent';

type QuizPageProps = {
    // All topic data=> questions, options...
    topicQuestionData:any[],
    name :String
};

const QuizPage:React.FC<QuizPageProps> = ({topicQuestionData, name}) => {
    
    return (
        <>
        <PageContent>
        <Box m={2} p={5}>
            <Heading m={2} p={5}>The Preview of {name} Quiz</Heading>
            
            <Link href='/dashboard'>
            <Button color='black' border='2px solid #265e9e' width='100%'
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg:' #618fd9',
                  color:'white' 
                }}>
                    Back
                 </Button>
            </Link>

            <List width='100%'>
                <Stack spacing={5}>
                     {
                         topicQuestionData.map((prevID:any,index:number) => (
                             <ListItem key={index} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)'
                                 m ={2} p={5}
                                > 
                                <Text >Question ID: {prevID.questionID}</Text>
                                <Image src={prevID.fileURL}/>
                                <Text >Question: {prevID.question}</Text>
                                <Text >Answer: {prevID.questionAnswer}</Text>  
                                <Text >Options:</Text>  
                                {
                                    <List width='100%' spacing={2}>
                
                                     {prevID.questionOptions.map((option:any,index:number) => (
                                         <ListItem key={index} border='2px solid #265e9e' width='50%'> 
                                              <Text align='center'>{option}</Text>  
                                          </ListItem>
                                     ))}
                                      
                                    </List>
                                }  

                                { prevID.questionResources.length!=0 ?
                                    <>
                                        <Text >Resources:</Text> 
                                        <List width='100%'spacing={2}>

                                         {prevID.questionResources.map((option:any,index:number) => (
                                             <ListItem key={index}border='2px solid #265e9e' width='50%'> 
                                                  <Text  align='center'>{option}</Text>  
                                              </ListItem>
                                         ))}
                                        </List>
                                    </>
                                    :''
                                }                       
                             </ListItem>
                         ))
                     }      
                </Stack>
            </List>
        </Box>
        <Link href='/dashboard'>
            <Button color='black' border='2px solid #265e9e' width='100%' 
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg:' #618fd9',
                  color:'white' 
                }}>
                    Back
                 </Button>
            </Link>
        </PageContent>
      
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   return getQuestion(context)
}

export default QuizPage;