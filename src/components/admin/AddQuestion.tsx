import { Button, Flex, Heading, Input, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { firestore, storage } from '@/src/firebase/clientApp'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import TreeStructure from './BinaryTree'
import BinaryTree from './BinaryTree'

type AddQuestionProps = {
  topicID: string
  numOfLOs: number
}

const AddQuestion: React.FC<AddQuestionProps> = ({ topicID, numOfLOs }) => {
  return (
    <div>
      <h1>Create {topicID} quiz</h1>
      <BinaryTree n={numOfLOs} /> {/* Example with n = 2 */}
    </div>
  )
}
export default AddQuestion
