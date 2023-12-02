import React, { useState } from 'react'
import BinaryTree from './BinaryTree'
import CustomHeading from '../texts/CustomHeading'
import BasicButton from '../buttons/BasicButton'

type AddQuestionProps = {
  topicID: string
  numOfLOs: number
}

const AddQuestion: React.FC<AddQuestionProps> = ({ topicID, numOfLOs }) => {
  const [loading, setLoading] = useState(false)
  const [addedQuestions, setAddedQuestions] = useState<number[]>([]) // Track added questions

  const handleQuestionAdded = (id: number) => {
    setAddedQuestions([...addedQuestions, id]) // Update the list of added questions
  }
  const handleSave = () => {
    setLoading(true)
    // Check if all questions have been answered

    setLoading(false)
  }
  // Check if all questions are added to display the Save Button
  const allQuestionsAdded = addedQuestions.length === 2 * numOfLOs - 1

  return (
    <div>
      <form onSubmit={handleSave}>
        <CustomHeading heading={`Create ${topicID} Quiz`} />
        <BinaryTree
          n={numOfLOs}
          topicID={topicID}
          onQuestionAdded={handleQuestionAdded}
        />
        {allQuestionsAdded && (
          <BasicButton
            routeName={`/quiz/${topicID}`}
            buttonName={'Save Quiz'}
          />
        )}
      </form>
    </div>
  )
}
export default AddQuestion
