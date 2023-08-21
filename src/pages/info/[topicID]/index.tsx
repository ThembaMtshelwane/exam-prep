import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/UserData';
import { Box, Heading, Button, Link ,Image} from '@chakra-ui/react';
import PageContent from '@/src/components/layout/PageContent';
import { Table,Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,} from '@chakra-ui/react'

type QuizPageProps = {
    // All topic data=> questions, options...
    userData:any[],
    name:string,
    quizHistory:any[],
};

const QuizPage:React.FC<QuizPageProps> = ({userData, name,quizHistory}) => {
    const [userIDs, setUserID] =useState<string[]>([])

    useEffect(() => {
        const getAllIds= ()=>{
            userData.map((user)=>{
              setUserID(prev =>[...prev,user.uid])
            })
          }
        getAllIds()
      },[]);



      console.log('quizHistory', quizHistory)

    
    return (
        <>
        <PageContent>
        <Box m={2} p={5}>
            <Heading m={2} p={5}>Student Information for {name} Quiz</Heading>

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
            <br /> <br />
            
            <Button color='black' border='2px solid #265e9e' width='100%'
                _active={{
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg:' #618fd9',
                  color:'white' 
                }}>
                Extract
            </Button>
            
            <br /><br />

            <TableContainer>
                <Table variant='simple'>
                  <TableCaption>Imperial to metric conversion factors</TableCaption>
                  
                  <Thead>
                    <Tr>
                      <Th>Student Email</Th>
                      <Th>Attempts</Th>
                      <Th>Results</Th>
                    </Tr>
                  </Thead>
                 
                  <Tbody>
                    {userData.length!=0?
                       userData.map((user)=>(
                          // Attempts
                          <Tr>
                           <Td>{user.email}</Td>
                           <Td>{quizHistory[0].results[1].question}</Td>
                           <Td isNumeric>25.4</Td>
                        </Tr>
                       ))
                    :''}
                  </Tbody>
                 </Table>
            </TableContainer>

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
        </Box>
        </PageContent>
      
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   return getAllUsers(context)
}

export default QuizPage;