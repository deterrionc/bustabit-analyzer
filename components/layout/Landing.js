import React from 'react'
import data from '../../utils/busta.json'
import LineChart from '../../components/layout/LineChart'

const Landing = () => {
  const [payout, setPayout] = React.useState(1000)
  const [count, setCount] = React.useState(0)
  const [maxCount, setMaxCount] = React.useState(0)
  const [lengthArray, setLengthArray] = React.useState([])
  const [totalProfit, setTotalProfit] = React.useState(0)
  const [profitArray, setProfitArray] = React.useState([])
  const [series, setSeries] = React.useState(null)

  React.useEffect(() => {
    let busts = data.busts
    let count = 0
    let bustCount = 0
    let maxCount = 0
    let lengthArray = []

    for (let i = 0; i < busts.length; i++) {
      let indiBust = busts[i]

      if (indiBust > payout) {
        count++
        lengthArray.push(bustCount)

        if (bustCount > maxCount) {
          maxCount = bustCount
        }

        bustCount = 0
      } else {
        bustCount++
      }
    }

    setCount(count)
    setMaxCount(maxCount)
    setLengthArray(lengthArray)
  }, [payout])

  React.useEffect(() => {
    if (lengthArray.length > 1) {
      let profit = 0
      let totalProfit = 0
      let lowProfit = 0
      let profitArray = []

      for (let i = 0; i < lengthArray.length; i++) {
        profit = 0

        let indiLength = lengthArray[i]

        if (indiLength < payout * 2) {  // SUCCESS
          profit = (indiLength + 1) * (payout - 1)
          profit = profit - (1 + indiLength) * indiLength / 2
        } else {                        // FAIL
          profit = profit - (1 + payout * 2) * payout

          if (profit < lowProfit) {
            lowProfit = profit
          }
        }

        totalProfit += profit

        profitArray.push({
          x: i,
          y: totalProfit
        })
      }

      setTotalProfit(totalProfit)
      setProfitArray(profitArray)
    }
  }, [lengthArray, payout])

  React.useEffect(() => {
    if (profitArray.length > 1) {
      setSeries([{
        data: profitArray
      }])
    }
  }, [profitArray])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 p-5'>
          <div className='form-group'>
            <select className='form-control' value={payout} onChange={e => setPayout(e.target.value)}>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
              <option value={800}>800</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
              <option value={5000}>5000</option>
              <option value={10000}>10000</option>
            </select>
          </div>
          <div><span className='mr-5'>Total Appear</span>{count}</div>
          <div><span className='mr-5'>No Appear Max</span>{maxCount}</div>
          <div><span className='mr-5'>Total Profit</span>{totalProfit}</div>
          <div>
            {series ? <LineChart series={series} /> : null}
          </div>
          <div>
            <span className='mr-5'>Over payout</span>
            <div className='container-fluid row'>
              <div className='col-12'>
                {lengthArray.map((item, index) =>
                  <div key={index} className={'d-inline-block mr-2 ' + (item > payout * 2 ? 'bg-danger ' : ' ')}>
                    {item},
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing