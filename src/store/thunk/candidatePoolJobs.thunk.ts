import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidatePoolJobsService } from '../../api/services/candidatePoolJobs.service'; // Adjust path
import {
  fetchCandidatePoolJobsStart,
  fetchCandidatePoolJobsSuccess,
  fetchCandidatePoolJobsFailure,
} from '../slices/candidatePoolJobs.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type
import { Job } from '../../models/types/Dashboard'; // Assuming your existing Job type is compatible

// Define the payload for the thunk
interface FetchCandidatePoolJobsPayload {
  page: number;
  pageSize: number;
  candidateProcessStatus?: 'S' | 'A';
  enterpriseProcessStatus?: 'O' | 'AS' ;
}

export const fetchCandidatePoolJobs = createAsyncThunk(
  'candidatePoolJobs/fetchCandidatePoolJobs',
  async (payload: FetchCandidatePoolJobsPayload, { dispatch }) => {
    try {
      dispatch(fetchCandidatePoolJobsStart());
      const response: Job[] = await CandidatePoolJobsService.getCandidatePoolJobs(
        payload.page,
        payload.pageSize,
        payload.candidateProcessStatus,
        payload.enterpriseProcessStatus
      );
      dispatch(fetchCandidatePoolJobsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidatePoolJobsFailure(apiError.message || 'Failed to fetch candidate pool jobs'),
      );
      throw error;
    }
  }
);
