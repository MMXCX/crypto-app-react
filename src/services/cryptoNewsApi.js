
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import newsOffline from "../offline/news.json";

const cryptoNewsApiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_PARID_API_KEY
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints(builder) {
    return {
      getNews: builder.query({
        query({ newsCategory, count }) {
          return createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        }
      })
    }
  }
})

export const { useGetNewsQuery } = cryptoNewsApi

// Offline mode
// export const useGetNewsQuery = () => ({isFetching: false, data: newsOffline})
