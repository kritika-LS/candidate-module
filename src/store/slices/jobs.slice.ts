import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 //  *** REPLACE THIS with the actual type of your job data! ***
 type Job = any;

 interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
 }

 const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
 };

 const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action: PayloadAction<Job[]>) => {
      console.log({dataaaaaaaaAaaaaaa: action})
      state.loading = false;
      state.jobs = action.payload;
    },
    fetchJobsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearJobsError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  clearJobsError,
 } = jobsSlice.actions;

 export default jobsSlice.reducer;