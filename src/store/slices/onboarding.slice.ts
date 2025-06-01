import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../api/apiClient';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const token = await AsyncStorage.getItem('auth_token');
      console.log('Token used for onboarding:', token);
      const response = await ApiClient.post('api/v1/candidate/onboard', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Keep this
          // 'Content-Type': 'multipart/form-data' // ❌ REMOVE this
        },
        // transformRequest: [(data, headers) => {
        //   // delete the JSON default:
        //   delete headers['Content-Type'];
        //   return data;
        // }],
      });
      return response?.data;
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