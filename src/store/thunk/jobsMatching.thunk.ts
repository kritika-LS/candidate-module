import { createAsyncThunk } from '@reduxjs/toolkit';
import { JobsMatchingService } from '../../api/services/jobsMatching.service'; // Import JobsMatchingApiResponse
import {
 fetchJobsMatchingStart,
 fetchJobsMatchingSuccess,
 fetchJobsMatchingFailure,
} from '../slices/jobsMatching.slice'; // Adjust path
import { ApiError } from '../../models/types/common';
import { JobSearchRequestBody, JobsMatchingApiResponse } from '../../models/types/jobSearch'; // Adjust path
import { Job } from '../../models/types/Dashboard'; // Ensure Job type is correctly imported

interface FetchJobsMatchingPayload {
 page: number;
 pageSize: number;
 requestBody: JobSearchRequestBody;
}

export const fetchJobsMatching = createAsyncThunk(
 'jobsMatching/fetchJobsMatching',
 async (payload: FetchJobsMatchingPayload, { dispatch }) => {
   try {
     dispatch(fetchJobsMatchingStart());
     // The service now returns the full JobsMatchingApiResponse
     const response: JobsMatchingApiResponse = await JobsMatchingService.getMatchingJobs(
       payload.page,
       payload.pageSize,
       payload.requestBody,
     );
     // Pass both jobs (responsePayload) and totalResults to the success action
     dispatch(fetchJobsMatchingSuccess({
       jobs: response.responsePayload,
       totalResults: response.totalResults // Use totalResults from the API response
     }));
     return response; // Return the full response if needed elsewhere
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(
       fetchJobsMatchingFailure(apiError.message || 'Failed to fetch matching jobs'),
     );
     throw error;
   }
 },
);
