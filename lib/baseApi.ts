import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import toast from 'react-hot-toast';

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://aloha-vietnam.azurewebsites.net/api/',
  credentials: 'include',
  prepareHeaders: async (headers) => {
    console.log('=== PREPARING HEADERS DEBUG ===')
    try {
      const token = await AsyncStorage.getItem('accessToken')
      // console.log('Token retrieved:', token ? 'YES' : 'NO')
      // console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        // console.log('Authorization header set')
      } else {
        // console.log('No authorization header - missing token')
      }

      // Ensure Content-Type is set
      if (!headers.get('Content-Type')) {
        headers.set('Content-Type', 'application/json')
        // console.log('Content-Type header set to application/json')
      }

      console.log('Final headers:', Array.from(headers.entries()))
    } catch (error) {
      console.error('Error preparing headers:', error)
    }
    return headers
  }
})

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Log request details for debugging
  // console.log('=== API REQUEST DEBUG ===')
  // console.log('Base URL: https://aloha-vietnam.azurewebsites.net/api/')
  if (typeof args === 'string') {
    // console.log('Endpoint:', args)
    // console.log('Full URL: https://aloha-vietnam.azurewebsites.net/api/' + args)
    // console.log('Method: GET')
  } else {
    // console.log('Endpoint:', args.url)
    // console.log('Full URL: https://aloha-vietnam.azurewebsites.net/api/' + args.url)
    // console.log('Method:', args.method || 'GET')
    // console.log('Body:', args.body)
    // console.log('Request headers:', args.headers)
  }

  const result = await customBaseQuery(args, api, extraOptions)

  // console.log('=== API RESPONSE DEBUG ===')
  // console.log('Status:', result.meta?.response?.status)
  // console.log('Status Text:', result.meta?.response?.statusText)
  // console.log('Response Headers:', result.meta?.response?.headers)
  // console.log('Success data:', result.data)
  // console.log('Error:', result.error)
  // console.log('Response URL:', result.meta?.response?.url)

  if (result.error) {
    const status =
      result.error.status === 'PARSING_ERROR' && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status
    const data = result.error.data as any

    // console.log('=== API ERROR DEBUG ===')
    // console.log('Error status:', status)
    // console.log('Error data:', data)
    // console.log('Full error:', JSON.stringify(result.error, null, 2))
  }

  return result
}
