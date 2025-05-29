import { createAsyncThunk } from '@reduxjs/toolkit';
import { JobsService } from '../../api/services/jobs.service';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from '../slices/jobs.slice';
import { ApiError } from '../../models/types/common';

export const fetchRecommendedJobs = createAsyncThunk(
  'jobs/fetchRecommendedJobs',
  async (
    { 
      page, 
      pageSize, 
      sortBy,
      job_category ,
      durationFrom,
      durationTo,
    }: {
      page: number;
      pageSize: number;
      sortBy: 'RELEVANCE' | 'NEWEST' | 'PAYRATE';
      job_category?: string;
      durationFrom?: null,
      durationTo?: null,
    },
    { dispatch }
  ) => {
    try {
      dispatch(fetchJobsStart());
      const response = await JobsService.getRecommendedJobs(
        page, 
        pageSize,
        sortBy,
        job_category,
        durationFrom,
        durationTo,
      );
      dispatch(fetchJobsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(fetchJobsFailure(apiError.message || 'Failed to fetch jobs'));
      throw error;
    }
  }
);