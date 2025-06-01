import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 //  *** REPLACE THIS with the actual type of your job data! ***
 type Job = any;

 interface JobsState {
  jobs: Job[];
  jobsObject: any,
  loading: boolean;
  error: string | null;
 }

 const initialState: JobsState = {
  jobs: [],
  jobsObject:{},
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
    fetchJobsSuccess: (state, action: PayloadAction<{ jobs: any[]; pagination?: string }>) => {
      state.loading = false;
      if (action.payload.pagination) {
        state.jobs = [...(state.jobs || []), ...action.payload.jobs];
      } else {
        state.jobs = action.payload.jobs;
      }
    },
    setJobsObject: (state, action: PayloadAction<string>) => {
      state.jobsObject = action.payload;
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
  setJobsObject,
  fetchJobsFailure,
  clearJobsError,
 } = jobsSlice.actions;

 export default jobsSlice.reducer;