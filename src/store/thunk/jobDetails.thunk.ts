import { createAsyncThunk } from '@reduxjs/toolkit';
 import {
  JobDetailsService,
 } from '../../api/services/jobDetails.service'; // Adjust path
 import {
  fetchJobDetailsStart,
  fetchJobDetailsSuccess,
  fetchJobDetailsFailure,
 } from '../slices/jobDetails.slice'; // Adjust path
 import { ApiError } from '../../models/types/common'; // Assuming you have this type for API errors
import { JobDetailsApiResponse } from '../../models/types/jobDetails';

 export const fetchJobDetails = createAsyncThunk(
  'jobDetails/fetchJobDetails',
  async (jobId: string, { dispatch }) => {
    try {
      dispatch(fetchJobDetailsStart());
      //@ts-ignore
      const response: JobDetailsApiResponse =
        await JobDetailsService.getJobDetails(jobId);
      dispatch(fetchJobDetailsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchJobDetailsFailure(apiError.message || 'Failed to fetch job details'),
      );
      throw error;
    }
  },
 );