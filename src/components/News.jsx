import { useGetNewsQuery } from '../services/cryptoNewsApi'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useGetCryptosQuery } from "../services/cryptoApi";
import demoImage from '../assets/th.jpeg'

const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const count = simplified ? 10 : 100
  const { data: cryptoNews } = useGetNewsQuery({ newsCategory, count })
  const { data } = useGetCryptosQuery(100)

  if (!cryptoNews?.value) return <div>Loading...</div>

  return (
      <Row gutter={[24, 24]}>
        {!simplified &&
            <Col span={24}>
              <Select
                  showSearch
                  className="select-news"
                  placeholder="Select a Crypto"
                  optionFilterProp="children"
                  onChange={(val) => setNewsCategory(val)}
                  filterOption={
                    (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map((coin) =>
                    <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>
                )}
              </Select>
            </Col>
        }
        {cryptoNews.value.map((news, id) =>
            <Col xs={24} sm={12} lg={8} key={id}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                    <img style={{ maxWidth: 200, maxHeight: 100 }} src={news?.image?.thumbnail?.contentUrl || demoImage}
                         alt="news"/>
                  </div>
                  <p>
                    {news.description.length > 100 ?
                        `${news.description.substring(0, 100)}...` :
                        news.description
                    }
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                      <Text className="provider-name">{news?.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
        )}
      </Row>
  )
}

export default News
