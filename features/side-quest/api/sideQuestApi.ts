import { baseQueryWithErrorHandling } from '@/lib/baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'
import { SideQuestCompletedResponse, TreasureHuntItem } from '../types'

type QuestApiQuery = {
  userId: string
  sideQuestId: number
  formData: FormData
}

export const questApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Home'],
  endpoints: (builder) => ({
    getQuestsData: builder.query<TreasureHuntItem[], number>({
      query: (id) => `/SideQuest/GetSideQuestByCityId/${id}`
    }),
    submitQuest: builder.mutation<SideQuestCompletedResponse, QuestApiQuery>({
      query: ({ userId, sideQuestId, formData }) => ({
        url: `SideQuest/CheckSideQuest?UserId=${userId}&SideQuestId=${sideQuestId}`,
        method: 'POST',
        body: formData
      })
    })
  })
})
export const { useGetQuestsDataQuery, useSubmitQuestMutation } = questApi
