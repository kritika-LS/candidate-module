import { createAsyncThunk } from '@reduxjs/toolkit';
 import {
  fetchCandidateReferencesStart,
  fetchCandidateReferencesSuccess,
  fetchCandidateReferencesFailure,
 } from '../slices/candidateReferences.slice';
 import { ApiError } from '../../models/types/common';
import { CandidateReferencesService } from '../../api/services/candidateReferences.service';

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