// import { homeApi } from '@/features/home/api/HomeApi';
import { packageApi } from '@/components/api/packageApi'
import { authApi } from '@/features/auth/api/authApi'
import { authSlice } from '@/features/auth/slice/authSlice'
import { clueApi } from '@/features/clue/api/clueApi'
import { homeApi } from '@/features/home/api/homeApi'

import { userProgressApi } from '@/features/leaderboard/api/leaderboardApi'
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
    [questApi.reducerPath]: questApi.reducer,
    [clueApi.reducerPath]: clueApi.reducer,
    [userProgressApi.reducerPath]: userProgressApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      packageApi.middleware,
      authApi.middleware,
      questApi.middleware,
      clueApi.middleware,
      userProgressApi.middleware,
      userApi.middleware,
    )
})

setupListeners(store.dispatch)
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
