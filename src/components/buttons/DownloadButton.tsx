import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

type StudentResult = {
  email: string
  outcome: string
  problemArea: string[]
}

type DownloadButtonProps = {
  filename: string
  studentResults: StudentResult[]
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  filename,
  studentResults,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentResults }),
      })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.xls`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading Excel file:', error)
    }
  }
  return (
    <Flex flexDirection="row" justify="center" align="center" m={5}>
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
        onClick={handleDownload}
      >
        Download Data
      </Button>
    </Flex>
  )
}
export default DownloadButton
