import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateReferencesService } from '../../api/services/candidateReferences.service';
import {
  fetchCandidateReferencesStart,
  fetchCandidateReferencesSuccess,
  fetchCandidateReferencesFailure,
  updateCandidateReferencesStart,
  updateCandidateReferencesSuccess,
  updateCandidateReferencesFailure,
} from '../slices/candidateReferences.slice';
import { ApiError } from '../../models/types/common';

export const fetchCandidateReferences = createAsyncThunk(
  'candidateReferences/fetchCandidateReferences',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchCandidateReferencesStart());
      const response = await CandidateReferencesService.getCandidateReferences();
      dispatch(fetchCandidateReferencesSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidateReferencesFailure(
          apiError.message || 'Failed to fetch candidate references',
        ),
      );
      throw error;
    }
  },
);

export const updateCandidateReferences = createAsyncThunk(
  'candidateReferences/updateCandidateReferences',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(updateCandidateReferencesStart());
      const response = await CandidateReferencesService.updateCandidateReferences(payload);
      dispatch(updateCandidateReferencesSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        updateCandidateReferencesFailure(
          apiError.message || 'Failed to update candidate references',
        ),
      );
      throw error;
    }
  },
);