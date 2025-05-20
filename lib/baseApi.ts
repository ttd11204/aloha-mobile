import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query'
// import toast from 'react-hot-toast';

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://aloha-vietnam.azurewebsites.net/api/',
  credentials: 'include'
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.token;
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
})

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await customBaseQuery(args, api, extraOptions);
  console.log(result);

  if (result.error) {
    // const status = result.error.status;
    const status =
      result.error.status === 'PARSING_ERROR' && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status
    const data = result.error.data as any

    switch (status) {
      case 400:
        // toast.error(data?.title || 'Bad Request');
        console.log('Bad Request', data)
        break
      case 401:
        // toast.error(data?.title || 'Unauthorized');
        console.log('Unauthorized', data)
        break
      case 403:
        // toast.error('Forbidden');
        console.log('Forbidden', data)
        break
      case 500:
        // toast.error('Server Error');
        console.log('Server Error', data)
        break
      case 'FETCH_ERROR':
        // toast.error('fetch Error');
        console.log('fetch Error', data)
        break
      default:
        // toast.error('Unexpected error');
        console.log('Unexpected error', data)
        break
    }
  }

  return result
}
