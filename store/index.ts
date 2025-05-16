// import { homeApi } from '@/features/home/api/HomeApi';
import { packageApi } from '@/features/home/api/packageApi';
import { homeSlice } from '@/features/home/slices/homeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
// import { secureStore } from './secureStore.ts';

// const persistConfig = {
//   key: 'root',
//   storage: secureStore, // ✅ thay vì mmkvStorage
//   whitelist: ['home'], // các slice cần persist
// };

// const persistedReducer = persistReducer(persistConfig, homeSlice.reducer);

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

// export const persistor = persistStore(store);

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
