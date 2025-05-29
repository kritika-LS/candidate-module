import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecommendedJobsWithFiltersService, RecommendedJobsWithFiltersApiResponse } from '../../api/services/recommendedJobsWithFilters.service'; // Import new service and its response type
import { fetchRecommendedJobsWithFiltersStart, fetchRecommendedJobsWithFiltersSuccess, fetchRecommendedJobsWithFiltersFailure } from '../slices/recommendedJobsWithFilters.slice'; // Import new slice actions
import { ApiError } from '../../models/types/common'; // Assuming ApiError type is defined here
import { JobSearchRequestBody } from '../../models/types/jobSearch'; // Import JobSearchRequestBody

// Define the payload for the thunk
interface FetchRecommendedJobsWithFiltersPayload {
 page: number;
 pageSize: number;
 requestBody?: Partial<JobSearchRequestBody>; // Make requestBody optional
}

export const fetchRecommendedJobsWithFilters = createAsyncThunk(
 'recommendedJobsWithFilters/fetchRecommendedJobsWithFilters',
 async (payload: FetchRecommendedJobsWithFiltersPayload, { dispatch }) => {
   try {
     dispatch(fetchRecommendedJobsWithFiltersStart());
     const response: RecommendedJobsWithFiltersApiResponse = await RecommendedJobsWithFiltersService.getRecommendedJobs(
       payload.page,
       payload.pageSize,
       payload.requestBody, // Pass the requestBody directly
     );
     // Dispatch success with both the jobs array and totalResults
     dispatch(fetchRecommendedJobsWithFiltersSuccess({ jobs: response.responsePayload, totalResults: response.totalResults }));
     return response; // Return the full response if needed elsewhere
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(fetchRecommendedJobsWithFiltersFailure(apiError.message || 'Failed to fetch recommended jobs with filters'));
     throw error;
   }
 },
);
