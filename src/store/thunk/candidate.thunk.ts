import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateService } from '../../api/services/candidate.service'; // Adjust the path
import { ApiError } from '../../models/types/common';

export const fetchCandidate = createAsyncThunk(
  'candidate/fetchCandidate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CandidateService.getCandidate();
      return response; // This will be action.payload in .fulfilled
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError?.data || 'Failed to fetch candidate data');
    }
  }
);