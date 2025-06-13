import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import toast from 'react-hot-toast';

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://aloha-vietnam.azurewebsites.net/api/',
  credentials: 'include',
  prepareHeaders: async (headers) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    } catch (error) {
      console.error('Error getting token:', error)
    }
    return headers
  },
})

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await customBaseQuery(args, api, extraOptions)

  if (result.error) {
    const status =
      result.error.status === 'PARSING_ERROR' && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status
    const data = result.error.data as any

    // Only log errors for debugging, no console spam
    if ((typeof status === 'number' && status >= 500) || status === 'FETCH_ERROR') {
      console.error('API Error:', status, data)
    }
  }

  return result
}
