import { baseQueryWithErrorHandling } from "@/lib/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TreasureHuntItem } from "../types";

export const questApi = createApi({
  reducerPath: "homeApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Home"],
  endpoints: (builder) => ({
    getQuestsData: builder.query<TreasureHuntItem[], number>({
      query: (id) => `/SideQuest/GetSideQuestByCityId/${id}`,
    }),
  }),
});
export const { useGetQuestsDataQuery } = questApi;
