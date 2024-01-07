import { Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'

type BasicButtonProps = {
  routeName: string
  buttonName: string
}

const BasicButton: React.FC<BasicButtonProps> = ({ routeName, buttonName }) => {
  return (
    <div>
      <Flex flexDirection="row" justify="center" align="center" m={5}>
        <Link href={routeName}>
          <Button
            color="black"
            border="2px solid #265e9e"
            _active={{
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
              bg: ' #618fd9',
              color: 'white',
            }}
          >
            {buttonName}
          </Button>
        </Link>
      </Flex>
    </div>
  )
}
export default BasicButton
