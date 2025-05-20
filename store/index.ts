// import { homeApi } from '@/features/home/api/HomeApi';
import { packageApi } from '@/components/api/packageApi'
import { authApi } from '@/features/auth/api/authApi'
import { authSlice } from '@/features/auth/slice/authSlice'
import { clueApi } from '@/features/clue/api/clueApi'

import { homeSlice } from '@/features/home/slices/homeSlice';
import { questApi } from '@/features/side-quest/api/sideQuestApi';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    //reducers
    home: homeSlice.reducer,
    auth: authSlice.reducer,

    //api
    // [homeApi.reducerPath]: homeApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [questApi.reducerPath]: questApi.reducer,
    [clueApi.reducerPath]: clueApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(packageApi.middleware, authApi.middleware, questApi.middleware, clueApi.middleware),
});

setupListeners(store.dispatch)
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
