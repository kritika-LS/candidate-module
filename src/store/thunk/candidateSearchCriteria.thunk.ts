import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CandidateSearchCriteriaService,
  CandidateSearchCriteriaResponse,
} from '../../api/services/candidateSearchCriteria.service'; // Adjust path
import {
  fetchCandidateSearchCriteriaStart,
  fetchCandidateSearchCriteriaSuccess,
  fetchCandidateSearchCriteriaFailure,
} from '../slices/candidateSearchCriteria.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type for API errors

export const fetchCandidateSearchCriteria = createAsyncThunk(
  'candidateSearchCriteria/fetchCandidateSearchCriteria',
  async (_, { dispatch }) => { // No input needed for this GET request
    try {
      dispatch(fetchCandidateSearchCriteriaStart());
      const response: CandidateSearchCriteriaResponse =
        await CandidateSearchCriteriaService.getCandidateSearchCriteria();
      dispatch(fetchCandidateSearchCriteriaSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidateSearchCriteriaFailure(
          apiError.message || 'Failed to fetch candidate search criteria',
        ),
      );
      throw error;
    }
  },
);