import React from 'react'
import ReactApexChart from 'react-apexcharts'

type ProblemAreaGraphProps = {
  studentResults: { problemArea: string[] }[]
}

const ProblemAreaGraph: React.FC<ProblemAreaGraphProps> = ({
  studentResults,
}) => {
  const problemAreasCount: { [key: string]: number } = {}

  studentResults.forEach((studentData) => {
    studentData.problemArea.forEach((area) => {
      problemAreasCount[area] = (problemAreasCount[area] || 0) + 1
    })
  })

  const problemAreas = Object.keys(problemAreasCount)
  const counts = Object.values(problemAreasCount)

  const series = [
    {
      data: counts,
    },
  ]

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: problemAreas,
    },
    title: {
      text: 'Problem Area Frequency',
    },
  }

  return (
    <div>
      <h2>Problem Area Frequency</h2>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  )
}

export default ProblemAreaGraph
