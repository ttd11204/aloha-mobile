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
  tagTypes: ['Clue'],
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
      { clueId: number; answer: string; userId: string }
    >({
      query: (clue) => ({
        url: 'Clue',
        method: 'POST',
        body: clue
      }),
      invalidatesTags: ['Clue']
    })
  })
})

export const {
  useGetCluesQuery,
  useGetCluesForCityQuery,
  useGetUserCityCluesQuery,
  usePostClueMutation
} = clueApi
