import { Clue } from '@/features/clue/types'
import { baseQueryWithErrorHandling } from '@/lib/baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export const clueApi = createApi({
  reducerPath: 'clueApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Clue'],
  endpoints: (builder) => ({
    getClues: builder.query<Clue[], void>({
      query: () => 'Clue',
      providesTags: ['Clue']
    })
  })
})

export const { useGetCluesQuery } = clueApi
