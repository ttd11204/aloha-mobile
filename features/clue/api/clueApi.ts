import {
  CluebyCityId,
  ClueData,
  PostClueResponse,
  UserCityClues
} from '@/features/clue/types'
import { baseQueryWithErrorHandling } from '@/lib/baseApi'
import { ResponseData } from '@/utils'
import { createApi } from '@reduxjs/toolkit/query/react'

export const clueApi = createApi({
  reducerPath: 'clueApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Clue', 'UserProgress'],
  endpoints: (builder) => ({
    // Get all clues
    getClues: builder.query<ClueData[], void>({
      query: () => 'Clue',
      providesTags: ['Clue']
    }),

    // Get clues by city id
    getCluesForCity: builder.query<ClueData[], number>({
      query: (cityId) => `Clue/GetClueByCityId/${cityId}`,
      providesTags: ['Clue']
    }),

    //Get User's Clue by City Id
    getUserCityClues: builder.query<
      ResponseData<UserCityClues[]>,
      { userId: string; cityId: number }
    >({
      query: ({ userId, cityId }) => `Clue/GetCluesForCity/${userId}/${cityId}`,
      providesTags: ['Clue']
    }),

    postClue: builder.mutation<
      ResponseData<PostClueResponse>,
      { clueId: number; answer: string; userId: string; cityId: number }
    >({
      query: ({ clueId, answer, userId }) => ({
        url: 'Clue',
        method: 'POST',
        body: { clueId, answer, userId }
      }),
      invalidatesTags: (result, error, { userId, cityId }) => [
        { type: 'UserProgress', id: `RANK-${userId}-${cityId}` }
      ]
    })
  })
})

export const {
  useGetCluesQuery,
  useGetCluesForCityQuery,
  useGetUserCityCluesQuery,
  usePostClueMutation
} = clueApi
