import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import QuestionNode from './QuestionNode'

interface BinaryTreeProps {
  n: number
}

const BinaryTree: React.FC<BinaryTreeProps> = ({ n }) => {
  const renderBlocks = (count: number): JSX.Element => {
    const totalBlocks = 2 * n - 1 // Total number of blocks

    const renderTree = (index: number): JSX.Element => {
      if (index >= totalBlocks) return <></>

      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2

      return (
        <Flex
          key={index}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box margin={1}>
            <QuestionNode content={`Question ${index + 1}`} />
          </Box>
          <Flex padding={0} margin="0">
            {renderTree(leftChildIndex)}
            {rightChildIndex < totalBlocks && renderTree(rightChildIndex)}
          </Flex>
        </Flex>
      )
    }

    return (
      <Box padding={0} margin="0">
        {renderTree(0)}
      </Box>
    )
  }

  return (
    <Box className="binary-tree" p={4}>
      {renderBlocks(2 * n - 1)}
    </Box>
  )
}

export default BinaryTree
