import { List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'

type CustomListProps = {
  data: string[]
}

const DisplayList: React.FC<CustomListProps> = ({ data }) => {
  return (
    <List width="100%" spacing={2}>
      {data.map((option: any, index: number) => (
        <ListItem key={index} border="2px solid #265e9e" width="50%">
          <Text align="center">{option}</Text>
        </ListItem>
      ))}
    </List>
  )
}
export default DisplayList
