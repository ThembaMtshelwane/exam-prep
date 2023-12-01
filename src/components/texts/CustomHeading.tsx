import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

type CustomHeadingProps = {
  heading: string
}

const CustomHeading: React.FC<CustomHeadingProps> = ({ heading }) => {
  return (
    <Box>
      <Flex flexDirection="column" alignItems="center" p="1rem" m="1rem">
        <Text fontWeight={700} fontSize={25} alignContent="centre">
          {heading}
        </Text>
      </Flex>
    </Box>
  )
}
export default CustomHeading
