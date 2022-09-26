import dynamic from "next/dynamic"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LineChart = ({ series }) => {

  const options = {
    chart: {
      type: 'area',
      height: 350,
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Bustabit Profit Analyze Per Payout',
      align: 'left'
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  }

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type='area'
        height='350px'
      />
    </div>
  )
}

export default LineChart