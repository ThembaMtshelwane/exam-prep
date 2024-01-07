import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'

type DownloadButtonProps = {
  filename: string
  currentTableRef: any
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  filename,
  currentTableRef,
}) => {
  return (
    <Flex flexDirection="row" justify="center" align="center" m={5}>
      <DownloadTableExcel
        filename={filename}
        sheet="students"
        currentTableRef={currentTableRef}
      >
        <Button
          color="black"
          border="2px solid #265e9e"
          width="100%"
          _active={{
            transform: 'scale(0.98)',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            bg: ' #618fd9',
            color: 'white',
          }}
        >
          Download Data
        </Button>
      </DownloadTableExcel>
    </Flex>
  )
}
export default DownloadButton
