import { Home } from '@/features/home/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Home = {
  id: '',
  name: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setExample: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearExample: (state) => {
      state.id = '';
      state.name = '';
    },
  },
});
export const { setExample, clearExample } = homeSlice.actions;
