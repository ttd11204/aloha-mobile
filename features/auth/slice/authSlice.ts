import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  twoFactorCode: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  role: null, // AsyncStorage is async, so we initialize as null
  twoFactorCode: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      const decode = jwtDecode(action.payload.accessToken);
      const role = (decode as any).role;
      state.role = role;
      // AsyncStorage is async, so we fire and forget here
      AsyncStorage.setItem('accessToken', action.payload.accessToken);
      AsyncStorage.setItem('refreshToken', action.payload.refreshToken);
      AsyncStorage.setItem('role', role);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('role');
    },
    changeUserRole: (state) => {
      state.role = null;
      AsyncStorage.removeItem('role');
    },
  },
});

const authReducer = authSlice.reducer;
export const { setCredentials, logout, changeUserRole } = authSlice.actions;
export default authReducer;