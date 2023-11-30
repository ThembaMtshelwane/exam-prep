import { Button, Link } from '@chakra-ui/react'
import React from 'react'

type BackToDashboardProps = {}

const BackToDashboard: React.FC<BackToDashboardProps> = () => {
  return (
    <div>
      {' '}
      <Link href="/dashboard">
        <Button
          color="black"
          border="2px solid #265e9e"
          width="100%"
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
          Back
        </Button>
      </Link>
    </div>
  )
}
export default BackToDashboard
