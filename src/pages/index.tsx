import { Flex, Text } from "@chakra-ui/react"
import type { NextPage } from "next"
import React from "react"

const Home: NextPage = () =>{
  return ( 
    <Flex  alignItems='center' justifyContent='center'>
      <Text fontSize={20} fontWeight={500}>
        Welcome to the Exam Prep Website
      </Text>
    </Flex>
  )
}
export default Home