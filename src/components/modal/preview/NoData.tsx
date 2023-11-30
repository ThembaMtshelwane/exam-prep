import { Heading, Box, Text } from '@chakra-ui/react'
import React from 'react'

type NoDataProps = {
  name: string
}

const NoData: React.FC<NoDataProps> = ({ name }) => {
  return (
    <Box m={2} p={5}>
      <Heading m={2} p={5}>
        The Preview of {name} Quiz
      </Heading>
      <Text>No Questions to Preview</Text>
    </Box>
  )
}
export default NoData
