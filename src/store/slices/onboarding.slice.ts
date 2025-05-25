import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { ApiClient } from '../../api/apiClient';
import { RootState } from '../store';

interface OnboardingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OnboardingState = {
  loading: false,
  error: null,
  success: false,
};

export const submitOnboarding = createAsyncThunk(
  'onboarding/submit',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/candidate/onboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.log({error})
      return rejectWithValue(error.response?.data?.message || 'Failed to submit onboarding');
    }
  }
);

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    resetOnboardingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOnboarding.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitOnboarding.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitOnboarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetOnboardingState } = onboardingSlice.actions;
export const selectOnboarding = (state: RootState) => state.onboarding;
export default onboardingSlice.reducer; 