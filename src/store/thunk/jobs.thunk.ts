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
      sortOrder, 
      sortBy,
      jobCategory 
    }: {
      page: number;
      pageSize: number;
      sortOrder: 'Asc' | 'Desc';
      sortBy: 'RELEVANCE' | 'NEWEST' | 'PAYRATE';
      jobCategory?: string;
    },
    { dispatch }
  ) => {
    try {
      dispatch(fetchJobsStart());
      const response = await JobsService.getRecommendedJobs(
        page, 
        pageSize, 
        sortOrder, 
        sortBy,
        jobCategory
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