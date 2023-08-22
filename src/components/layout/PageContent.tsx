import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const PageContent:React.FC<Props> = ({children}) => {
    
    return (
        <>
        {/* Outter most layer = The grey background */}
        <Flex justify='center' p='16px 0px'
        //  border='1px solid red'
         >
            {/* The main layer = The white foreground */}
            <Flex 
            width='95%'
            justify='center'
            maxWidth='860px'
            border='1px solid #11355e' 
            direction='column'  
            bg='white'
            borderRadius='5px'     
            >
                {children && children}
            </Flex> 
        </Flex>
        </>
    )
}
export default PageContent;