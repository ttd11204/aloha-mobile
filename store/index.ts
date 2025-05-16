// import { homeApi } from '@/features/home/api/HomeApi';
import { packageApi } from '@/features/home/api/packageApi';
import { homeSlice } from '@/features/home/slices/homeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    //reducers
    home: homeSlice.reducer,

    //api
    // [homeApi.reducerPath]: homeApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(packageApi.middleware),
});

setupListeners(store.dispatch);
// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
