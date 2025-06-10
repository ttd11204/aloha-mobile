import { baseQueryWithErrorHandling } from "@/lib/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "../types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserProfile"],
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfile, string>({
            query: (id) => `/User/profile/${id}`,
            providesTags: ["UserProfile"],
        }),
    })
});
export const { useGetUserProfileQuery } = userApi;
