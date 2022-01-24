import React from 'react';
import { Chart as ChartJS,  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd'
import millify from 'millify'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []
  const coinTimestamp = []

  const length = coinHistory?.data?.history?.length

  for (let i = 0; i < length; i++) {
    coinPrice.push(coinHistory?.data?.history[length - i - 1].price)
    coinTimestamp.push(new Date(coinHistory?.data?.history[length - i - 1].timestamp * 1000).toLocaleDateString())
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        borderColor: '#0071bd',
        backgroundColor: '#0071bd',
        fill: false
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  return (
      <>
        <Row className="chart-header">
          <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
          <Col className="price-container">
            <Typography.Title level={5} className="price-change">{coinHistory?.data?.change}%</Typography.Title>
            <Typography.Title level={5} className="current-price">Current {coinName} Price:
              $ {millify(currentPrice)}</Typography.Title>
          </Col>
        </Row>
        <Line data={data} options={options}/>
      </>
  )
}

export default LineChart
