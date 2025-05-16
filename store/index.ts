// import { homeApi } from '@/features/home/api/HomeApi';
import { packageApi } from '@/features/home/api/packageApi';
import { homeSlice } from '@/features/home/slices/homeSlice';
import { mmkvStorage } from '@/store/mmkvStorage';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  whitelist: ['home'],
};

const persistedReducer = persistReducer(persistConfig, homeSlice.reducer);

export const store = configureStore({
  reducer: {
    //reducers
    home: persistedReducer,

    //api
    [homeApi.reducerPath]: homeApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tránh lỗi serialize với MMKV
    }).concat(homeApi.middleware),
});

// export const persistor = persistStore(store);

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
