import { Home } from '@/features/home/types';
import { baseQueryWithErrorHandling } from '@/lib/baseApi';
import { PagedResult } from '@/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Home'],
  endpoints: (builder) => ({
    getHomeData: builder.query<PagedResult<Home>, void>({
      query: () => '/home',
    }),

    updateHomeData: builder.mutation({
      query: (data) => ({
        url: '/home',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});
export const { useGetHomeDataQuery, useUpdateHomeDataMutation } = homeApi;
