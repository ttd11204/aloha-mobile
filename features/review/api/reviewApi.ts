import {
  PostReviewRequest,
  ReviewListResponse,
  ReviewResult
} from '@/features/clue/types/review'
import { baseQueryWithErrorHandling } from '@/lib/baseApi'
import { ResponseData } from '@/utils'
import { createApi } from '@reduxjs/toolkit/query/react'

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    reviewList: builder.query<ReviewListResponse[], void>({
      query: () => ({
        url: 'Review',
        method: 'GET'
      })
    }),
    postReview: builder.mutation<ResponseData<ReviewResult>, PostReviewRequest>(
      {
        query: ({ userId, review }) => ({
          url: `ClueReview/${userId}`,
          method: 'POST',
          body: review
        }),
        invalidatesTags: ['Review']
      }
    )
  })
})

export const { usePostReviewMutation, useReviewListQuery } = reviewApi
