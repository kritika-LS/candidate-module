import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobDetailsApiResponse } from '../../models/types/jobDetails';

 interface JobDetailsState {
  data: JobDetailsApiResponse | null;
  loading: boolean;
  error: string | null;
 }

 const initialState: JobDetailsState = {
  data: null,
  loading: false,
  error: null,
 };

 const jobDetailsSlice = createSlice({
  name: 'jobDetails',
  initialState,
  reducers: {
    fetchJobDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.data = null; // Clear previous data on new fetch
    },
    fetchJobDetailsSuccess: (
      state,
      action: PayloadAction<JobDetailsApiResponse>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchJobDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    clearJobDetailsError: (state) => {
      state.error = null;
    },
    clearJobDetails: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
 });

 export const {
  fetchJobDetailsStart,
  fetchJobDetailsSuccess,
  fetchJobDetailsFailure,
  clearJobDetailsError,
  clearJobDetails,
 } = jobDetailsSlice.actions;

 export default jobDetailsSlice.reducer;