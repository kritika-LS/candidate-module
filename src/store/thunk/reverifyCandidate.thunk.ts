import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateReverifyService } from '../../api/services/candidateReverify.service';
import { ReverifyRequestBody } from '../../models/types/candidateReverify';
import {
  reverifyStart,
  reverifySuccess,
  reverifyFailure,
} from '../slices/candidateReverify.slice';
import { ApiError } from '../../models/types/common';

export const reverifyCandidate = createAsyncThunk(
  'candidateReverify/reverify', // Unique action type prefix
  async (payload: ReverifyRequestBody, { dispatch }) => {
    try {
      dispatch(reverifyStart());

      const response = await CandidateReverifyService.reverify(payload);

      dispatch(reverifySuccess(response));

      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(reverifyFailure(apiError.message || 'Failed to reverify account.'));
      throw error;
    }
  }
);
