import React, { useState } from 'react'
import { Flex, Box, Link, Button } from '@chakra-ui/react'
import QuestionNode from './QuestionNode'
import questionIDs, { getCorrectLevel } from './data'

interface BinaryTreeProps {
  n: number
  topicID: string
  onQuestionAdded: any
}

const BinaryTree: React.FC<BinaryTreeProps> = ({
  n,
  topicID,
  onQuestionAdded,
}) => {
  const renderBlocks = (count: number): JSX.Element => {
    const totalBlocks = 2 * n - 1 // Total number of blocks
    const validQuestionIDs = questionIDs.slice(0, totalBlocks)
    const levelIDs = getCorrectLevel(totalBlocks)

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
          <QuestionNode
            content={`Question ${index + 1}`}
            topicID={topicID}
            id={validQuestionIDs[index]}
            level={levelIDs[index]}
            onQuestionAdded={() => onQuestionAdded(index)} // Pass the callback
          />

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
