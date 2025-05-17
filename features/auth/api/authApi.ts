import { baseQueryWithErrorHandling } from "@/lib/baseApi"
import { createApi } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/Auth/register',
        method: 'POST',
        body: userData
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/Auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    changeRole : builder.mutation({ 
      query: (userId) => ({
        url: '/Auth/change-role',
        method: 'POST',
        body: userId
      })
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useChangeRoleMutation } = authApi