import coinsOffline from '../offline/coins.json'
import coinDetailsOffline from '../offline/coinDetails.json'
import coinHistoryOffline from '../offline/coinHistory.json'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_PARID_API_KEY
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints(builder) {
    return {
      getCryptos: builder.query({
        query(count) {
          return createRequest(`/coins?limit=${count}`)
        }
      }),
      getCryptoDetails: builder.query({
        query(coinId) {
          return createRequest(`/coin/${coinId}`)
        }
      }),
      getCoinHistory: builder.query({
        query({ coinId, timePeriod }) {
          return createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        }
      })
    }
  }
})



// export const { useGetCryptosQuery } = cryptoApi
// export const { useGetCryptoDetailsQuery } = cryptoApi
// export const { useGetCoinHistoryQuery } = cryptoApi

// Offline mode
export const useGetCryptosQuery = () => ({isFetching: false, data: coinsOffline})
export const useGetCryptoDetailsQuery = () => ({isFetching: false, data: coinDetailsOffline})
export const useGetCoinHistoryQuery = () => ({isFetching: false, data: coinHistoryOffline})
