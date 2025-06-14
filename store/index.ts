// import { homeApi } from '@/features/home/api/HomeApi';
import { packageApi } from '@/components/api/packageApi'
import { authApi } from '@/features/auth/api/authApi'
import { authSlice } from '@/features/auth/slice/authSlice'
import { chatApi } from '@/features/chat/api/chatApi'
import { clueApi } from '@/features/clue/api/clueApi'
import { reviewApi } from '@/features/review/api/reviewApi'

import { userProgressApi } from '@/features/leaderboard/api/leaderboardApi'
import { paymentApi } from '@/features/orderPayment/api/paymentApi'
import { questApi } from '@/features/side-quest/api/sideQuestApi'
import { userApi } from '@/features/userProfile/api/userProfileApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    //reducers
    auth: authSlice.reducer,

    //api
    // [homeApi.reducerPath]: homeApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [questApi.reducerPath]: questApi.reducer,
    [clueApi.reducerPath]: clueApi.reducer,
    [userProgressApi.reducerPath]: userProgressApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      packageApi.middleware,
      authApi.middleware,
      chatApi.middleware,
      questApi.middleware,
      clueApi.middleware,
      userProgressApi.middleware,
      userApi.middleware,
      paymentApi.middleware,
      reviewApi.middleware
    )
})

setupListeners(store.dispatch)
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
