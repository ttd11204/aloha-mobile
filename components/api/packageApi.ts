import { Package } from '@/features/home/types';
import { baseQueryWithErrorHandling } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export const packageApi = createApi({
  reducerPath: 'packageApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Package'],
  endpoints: (builder) => ({
    getPackageData: builder.query<Package[], void>({
      query: () => '/Package',
    }),
    getPackageDataById: builder.query<Package, number>({
      query: (id) => `/Package/${id}`,
    }),
  }),
});
export const { useGetPackageDataQuery, useGetPackageDataByIdQuery } = packageApi;