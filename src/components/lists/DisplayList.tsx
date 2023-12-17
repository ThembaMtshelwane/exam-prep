import { List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'

type DisplayListProps = {
  data: string[]
  heading: string
  type?: string
}

const DisplayList: React.FC<DisplayListProps> = ({ data, heading, type }) => {
  return (
    <div>
      {data.filter((item: string) => item.trim() !== '').length > 0 ? (
        <div>
          <Text>{heading}</Text>
          <List width="100%" spacing={2}>
            {data.map((option: string, index: number) => (
              <div key={option + index}>
                {option ? (
                  <ListItem key={option} border="2px solid #265e9e" width="50%">
                    {type === 'link' ? (
                      <Text align="center">
                        <a href={option}>{option}</a>
                      </Text>
                    ) : (
                      <Text align="center">{option}</Text>
                    )}
                  </ListItem>
                ) : (
                  ''
                )}
              </div>
            ))}
          </List>
        </div>
      ) : (
        '' // 'No resources'
      )}
    </div>
  )
}
export default DisplayList
