import { Flex, Icon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import TopicModal from '../modal/topic/TopicModal'

type AddQuizProps = {}

const AddQuizIcon: React.FC<AddQuizProps> = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <TopicModal open={open} handleClose={() => setOpen(false)} />
      <Flex align="center" justify="center" mt={5} fontWeight={600}>
        {/* // Add Quiz Button*/}
        <Icon
          fontSize={20}
          mr={2}
          as={GrAdd}
          cursor="pointer"
          onClick={() => setOpen(true)}
          alignSelf="center"
        />
        <Text fontSize={15}>Add Quiz</Text>
      </Flex>
    </div>
  )
}
export default AddQuizIcon
