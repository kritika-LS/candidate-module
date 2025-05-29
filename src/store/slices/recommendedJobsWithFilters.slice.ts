import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../models/types/Dashboard'; // Ensure Job type is correct

interface RecommendedJobsWithFiltersState {
 jobs: Job[];
 loading: boolean;
 error: string | null;
 totalResults: number;
}

const initialState: RecommendedJobsWithFiltersState = {
 jobs: [],
 loading: false,
 error: null,
 totalResults: 0,
};

const recommendedJobsWithFiltersSlice = createSlice({
 name: 'recommendedJobsWithFilters',
 initialState,
 reducers: {
   fetchRecommendedJobsWithFiltersStart: (state) => {
     state.loading = true;
     state.error = null;
   },
   fetchRecommendedJobsWithFiltersSuccess: (state, action: PayloadAction<{ jobs: Job[]; totalResults: number }>) => {
     state.loading = false;
     state.jobs = action.payload.jobs;
     state.totalResults = action.payload.totalResults;
   },
   fetchRecommendedJobsWithFiltersFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.jobs = []; // Clear jobs on error
     state.totalResults = 0; // Reset totalResults on error
   },
   clearRecommendedJobsWithFiltersError: (state) => {
     state.error = null;
   },
 },
});

export const {
 fetchRecommendedJobsWithFiltersStart,
 fetchRecommendedJobsWithFiltersSuccess,
 fetchRecommendedJobsWithFiltersFailure,
 clearRecommendedJobsWithFiltersError,
} = recommendedJobsWithFiltersSlice.actions;

export default recommendedJobsWithFiltersSlice.reducer;
