import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../models/types/Dashboard';

interface JobsMatchingState {
 jobs: Job[];
 loading: boolean;
 error: string | null;
 totalResults: number;
}

const initialState: JobsMatchingState = {
 jobs: [],
 loading: false,
 error: null,
 totalResults: 0
};

const jobsMatchingSlice = createSlice({
 name: 'jobsMatching',
 initialState,
 reducers: {
   fetchJobsMatchingStart: (state) => {
     state.loading = true;
     state.error = null;
   },
   fetchJobsMatchingSuccess: (state, action: PayloadAction<{ jobs: Job[]; totalResults: number }>) => {
     state.loading = false;
     state.jobs = action.payload.jobs;
     state.totalResults = action.payload.totalResults;
   },
   fetchJobsMatchingFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.jobs = [];
     state.totalResults = 0;
   },
   clearJobsMatchingError: (state) => {
     state.error = null;
   },
 },
});

export const {
 fetchJobsMatchingStart,
 fetchJobsMatchingSuccess,
 fetchJobsMatchingFailure,
 clearJobsMatchingError,
} = jobsMatchingSlice.actions;

export default jobsMatchingSlice.reducer;
