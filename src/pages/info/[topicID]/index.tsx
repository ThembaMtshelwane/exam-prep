import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../api/UserData';
import { Box, Heading, Button, Link, Tr} from '@chakra-ui/react';
import PageContent from '@/src/components/layout/PageContent';
import { Table,Thead, Tbody, Th, Td, TableContainer,} from '@chakra-ui/react'
import { DownloadTableExcel } from 'react-export-table-to-excel';

type QuizPageProps = {
    // All topic data=> questions, options...
    userData:any[],
    name:string,
    quizHistory:any[],
};

const QuizPage:React.FC<QuizPageProps> = ({userData, name,quizHistory}) => {
    const [studentResults, setStudentResults] =useState<any[]>([{}])
    const [filename, setFilename] =useState<string>('s')
    const tableRef = useRef(null);

    useEffect(() => {
      const percentage= ()=>{
        let count =0
        setFilename(`${name} quiz student info`)
        quizHistory.forEach((history:any)=>{
          history.results.forEach((outcome:any) => {
            if(outcome.result === 'correct') {
              count++
            }
          })
          setStudentResults(prev =>[prev,{email:history.studentID,outcome:100*count/(history.results.length -1 )} ])
        })
      }
      percentage()
      });
      
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
            <DownloadTableExcel
                    filename={filename}
                    sheet="users"
                    currentTableRef={tableRef.current}
                >         
                <Button color='black' border='2px solid #265e9e' width='100%'
                    _active={{
                      transform: 'scale(0.98)',
                    }}
                    _focus={{
                      boxShadow:'0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                      bg:' #618fd9',
                      color:'white' 
                    }}>
                    Download Data
                </Button>
             </DownloadTableExcel>
            
            <br /><br />

            <TableContainer>
                <Table variant='simple' ref={tableRef}>
                  <Thead>
                    <Tr>
                      <Th>Student Email</Th>
                      <Th>Results</Th>
                    </Tr>
                  </Thead>
                 
                  <Tbody>
                    {studentResults.length!=0?
                       studentResults.map((studentData,index)=>(
                          <Tr key={index}>
                           <Td>{studentData.email}</Td>
                           <Td>{studentData.outcome}</Td>
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