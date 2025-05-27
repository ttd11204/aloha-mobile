import { createSlice } from '@reduxjs/toolkit'

export const clueSlice = createSlice({
  name: 'clue',
  initialState: {
    clues: [],
    loading: false,
    error: null
  },
  reducers: {
    setClues: (state, action) => {
      state.clues = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})
