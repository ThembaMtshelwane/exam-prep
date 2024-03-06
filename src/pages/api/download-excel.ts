import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

type StudentResult = {
  email: string
  outcome: string
  problemArea: string[]
}

// Function to generate Excel content
const generateExcelContent = (studentResults: StudentResult[]) => {
  const tableHeading = 'Student Email \t Results %\n'
  const tableData = studentResults
    .map((student) => {
      return `${student.email} \t ${student.outcome}\n`
    })
    .join('')
  const tableInfo = tableHeading + tableData

  // Extract problem areas and count occurrences
  const problemAreasCount: { [key: string]: number } = studentResults.reduce(
    (acc: any, curr: any) => {
      curr.problemArea.forEach((area: any) => {
        acc[area] = (acc[area] || 0) + 1
      })
      return acc
    },
    {}
  )

  const problemAreasData = Object.keys(problemAreasCount).map((key) => ({
    problemArea: key,
    count: problemAreasCount[key],
  }))

  const graphHeading = 'Problem Area \t Number of students\n'
  const graphData = problemAreasData
    .map((data) => {
      return `${data.problemArea} \t ${data.count}\n`
    })
    .join('')

  const graphInfo = 'Graph Data\n' + graphHeading + graphData
  return `${tableInfo}\n${graphInfo}`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get quizHistory data from the request body
    const { studentResults }: { studentResults: StudentResult[] } = req.body

    // Generate Excel file content using quizHistory data
    const excelContent = generateExcelContent(studentResults)

    const filename = 'data.xlsx'

    // Write content to a temporary file
    fs.writeFileSync(filename, excelContent)

    // Serve the file as a downloadable attachment
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.status(200).send(fs.readFileSync(filename))

    // Cleanup: Delete the temporary file after download is completed or failed
    fs.unlinkSync(filename)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
