import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DoNotDisturbApiResponse, DoNotDisturbStatus } from '../../models/types/doNotDisturb'; // Import relevant types

interface DoNotDisturbState {
  currentStatus: DoNotDisturbStatus | null; // Stores the last set status, or current if fetched
  loading: boolean;                       // Indicates if the update operation is in progress
  error: string | null;                   // Stores any error messages
  success: boolean;                       // Indicates if the last update was successful
}

const initialState: DoNotDisturbState = {
  currentStatus: null,
  loading: false,
  error: null,
  success: false,
};

const doNotDisturbSlice = createSlice({
  name: 'doNotDisturb', // Unique name for the slice
  initialState,
  reducers: {

    updateDoNotDisturbStart: (state, action: PayloadAction<DoNotDisturbStatus>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.currentStatus = action.payload;
    },

    updateDoNotDisturbSuccess: (state, action: PayloadAction<DoNotDisturbApiResponse>) => {
      state.loading = false;
      state.success = true;
    },

    updateDoNotDisturbFailure: (state, action: PayloadAction<{ error: string; previousStatus: DoNotDisturbStatus }>) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = false;
      state.currentStatus = action.payload.previousStatus;
    },

    clearDoNotDisturbState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    setDoNotDisturbStatus: (state, action: PayloadAction<DoNotDisturbStatus>) => {
      state.currentStatus = action.payload;
    }
  },
});


export const {
  updateDoNotDisturbStart,
  updateDoNotDisturbSuccess,
  updateDoNotDisturbFailure,
  clearDoNotDisturbState,
  setDoNotDisturbStatus,
} = doNotDisturbSlice.actions;

export default doNotDisturbSlice.reducer;
