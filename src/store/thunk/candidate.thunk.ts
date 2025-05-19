import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidateService } from '../../api/services/candidate.service'; // Adjust path
 import { ApiError } from '../../models/types/common';
import { fetchCandidateFailure, fetchCandidateStart, fetchCandidateSuccess } from '../slices/candidate.slice';

 export const fetchCandidate = createAsyncThunk(
  'candidate/fetchCandidate',
  async (_, { dispatch }) => { // No input needed
    try {
      dispatch(fetchCandidateStart());
      const response = await CandidateService.getCandidate();
      dispatch(fetchCandidateSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(fetchCandidateFailure(apiError.message || 'Failed to fetch candidate data'));
      throw error;
    }
  }
 );