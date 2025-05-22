import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  idToken: string | null;
  // Add other relevant auth details like user info if needed
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // Start as true while checking auth state
  accessToken: null,
  idToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string | null; idToken: string | null }>) => {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.idToken = null;
    },
  },
});

export const { setAuthLoading, setAuthenticated, setTokens, clearAuth } = authSlice.actions;
export default authSlice.reducer;