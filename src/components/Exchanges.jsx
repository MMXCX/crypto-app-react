import { useGetCoinExchangesQuery } from '../services/cryptoApi'
import { useState } from 'react'
import { Col, Collapse, Row, Typography, Avatar } from 'antd'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import Loader from './Loader'

const { Text } = Typography
const { Panel } = Collapse


const Exchanges = () => {
  const { data, isFetching } = useGetCoinExchangesQuery({ uuid: 'Qwsogvtv82FCd', limit: '30' })
  const exchangesList = data?.data?.exchanges

  if (isFetching) return <Loader/>
  return (
      <>
        <Row>
          <Col span={6}>Exchanges</Col>
          <Col span={6}>24h Trade Volume</Col>
          <Col span={6}>Markets</Col>
          <Col span={6}>Change</Col>
        </Row>
        <Row>
          {exchangesList.map((exchange) => {
            const { '24hVolume': helper } = exchange
            return (
                <Col span={24} key={exchange.uuid}>
                  <Collapse>
                    <Panel
                        showArrow={false}
                        header={
                          <Row key={exchange.uuid} style={{ width: '100%' }}>
                            <Col span={6}>
                              <Text><strong>{exchange.rank}.</strong></Text>
                              <Avatar className="exchange-image" src={exchange.iconUrl}/>
                              <Text><strong>{exchange.name}</strong></Text>
                            </Col>
                            <Col span={6}>${millify(helper)}</Col>
                            <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                            <Col span={6}>{millify(exchange.price)}</Col>
                          </Row>
                        }
                    >
                      {HTMLReactParser('')}
                    </Panel>
                  </Collapse>
                </Col>
            )
          })}
        </Row>
      </>
  )
}
export default Exchanges
