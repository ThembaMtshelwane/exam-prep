import { Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';

const NotFound:React.FC = () => {
    
    return (
        <Flex
            direction='column'
            justifyContent='center'
            alignItems='center'
            minHeight='60vh'
        >
            Sorry, that topic does not exist or has been delated
            <Link href='/'>
                <Button mt={40}>
                    GO HOME
                </Button>
            </Link>
        </Flex>
    )
}
export default NotFound;