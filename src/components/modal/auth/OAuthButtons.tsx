import { Button, Flex } from '@chakra-ui/react';
import React from 'react';


const OAuthButtons:React.FC = () => {
    return (
        <Flex>
            <Button bg="#265e9e" color="white" mb={2} mt={2} type='submit'
              width='100%'>
                Continue with Student Email</Button>
        </Flex>
    )
}
export default OAuthButtons;