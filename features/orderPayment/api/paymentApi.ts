import { baseQueryWithErrorHandling } from "@/lib/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    createPayment: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `Payment/create`,
        method: "POST",
        body: formData
      }),
    }),
  }),
})

export const { useCreatePaymentMutation } = paymentApi;