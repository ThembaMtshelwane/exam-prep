import { Button, Flex } from '@chakra-ui/react'

type saveProps = {
  loading: boolean
}

const SaveButton: React.FC<saveProps> = ({ loading }) => {
  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Button type="submit" width="50%" isLoading={loading}>
          Save
        </Button>
      </Flex>
    </>
  )
}

export default SaveButton
