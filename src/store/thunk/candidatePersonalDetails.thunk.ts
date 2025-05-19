import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidatePersonalDetailsService } from '../../api/services/candidatePersonalDetails.service'; // Adjust path
 import {
  fetchCandidatePersonalDetailsStart,
  fetchCandidatePersonalDetailsSuccess,
  fetchCandidatePersonalDetailsFailure,
 } from '../slices/candidatePersonalDetails.slice'; // Adjust path
 import { ApiError } from '../../models/types/common';

 export const fetchCandidatePersonalDetails = createAsyncThunk(
  'candidatePersonalDetails/fetchCandidatePersonalDetails',
  async (_, { dispatch }) => { // No input needed
    try {
      dispatch(fetchCandidatePersonalDetailsStart());
      const response = await CandidatePersonalDetailsService.getCandidatePersonalDetails();
      dispatch(fetchCandidatePersonalDetailsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidatePersonalDetailsFailure(
          apiError.message || 'Failed to fetch candidate personal details',
        ),
      );
      throw error;
    }
  },
 );