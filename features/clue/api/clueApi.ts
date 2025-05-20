import { Clue, CluebyCityId } from '@/features/clue/types'
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
    }),
    // postClue: builder.mutation<void, { clueId: number; code: string; userId: string }>({
    //   query: ({ clueId, code, userId }) => ({
    //     url: `Clue/${clueId}/verify`,
    //     method: 'POST',
    //     body: { code, userId }
    //   }),
    //   invalidatesTags: ['Clue']
    // })
    getCluesForCity: builder.query<CluebyCityId[], number>({
      query: (cityId) => `Clue/GetClueByCityId/${cityId}`,
      providesTags: ['Clue']
    })
  })
})

export const { useGetCluesQuery, useGetCluesForCityQuery } = clueApi
