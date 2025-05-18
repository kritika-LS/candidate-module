import { createAsyncThunk } from '@reduxjs/toolkit';
 import { JobsService } from '../../api/services/jobs.service';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from '../slices/jobs.slice';
import { ApiError } from '../../models/types/common';

 export const fetchRecommendedJobs = createAsyncThunk(
  'jobs/fetchRecommendedJobs',
  async (
    { page, pageSize, sortOrder, sortBy }: {
      page: number;
      pageSize: number;
      sortOrder: 'Asc' | 'Desc';
      sortBy: 'RELEVANCE';
    },
    { dispatch }
  ) => {
    try {
      dispatch(fetchJobsStart());
      const response = await JobsService.getRecommendedJobs(page, pageSize, sortOrder, sortBy);
      dispatch(fetchJobsSuccess(response)); //  Assuming the service returns the job array
      return response;
    } catch (error) {
      const apiError = error as ApiError; //  If you're using ApiError
      dispatch(fetchJobsFailure(apiError.message || 'Failed to fetch jobs')); //  Be safe with the message
      throw error;
    }
  }
 );