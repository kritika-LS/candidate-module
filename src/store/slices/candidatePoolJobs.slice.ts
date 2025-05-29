import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../models/types/Dashboard'; // Assuming your existing Job type is compatible

interface CandidatePoolJobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: CandidatePoolJobsState = {
  jobs: [],
  loading: false,
  error: null,
};

const candidatePoolJobsSlice = createSlice({
  name: 'candidatePoolJobs',
  initialState,
  reducers: {
    fetchCandidatePoolJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidatePoolJobsSuccess: (state, action: PayloadAction<Job[]>) => {
      state.loading = false;
      state.jobs = action.payload;
    },
    fetchCandidatePoolJobsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidatePoolJobsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCandidatePoolJobsStart,
  fetchCandidatePoolJobsSuccess,
  fetchCandidatePoolJobsFailure,
  clearCandidatePoolJobsError,
} = candidatePoolJobsSlice.actions;

export default candidatePoolJobsSlice.reducer;
