import { UserProgress } from '@/features/leaderboard/types'
import { baseQueryWithErrorHandling } from '@/lib/baseApi'
import { ResponseData } from '@/utils'
import { createApi } from '@reduxjs/toolkit/query/react'

console.trace('useGetTop3UserByCityIdQuery called')
export const userProgressApi = createApi({
  reducerPath: 'userProgressApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    // Get leaderboard data
    getTop3UserByCityId: builder.query<
      ResponseData<UserProgress[]>,
      { cityId: number }
    >({
      query: ({ cityId }) => `/UserProgress/GetTop3UserByCityId/${cityId}`
    }),

    // Get user rank in city
    getUserRankInCity: builder.query<
      ResponseData<UserProgress>,
      { userId: string; cityId: number }
    >({
      query: ({ userId, cityId }) =>
        `/UserProgress/GetUserRankInCity/${cityId}/${userId}`
    })
  })
})

export const { useGetTop3UserByCityIdQuery, useGetUserRankInCityQuery } =
  userProgressApi
