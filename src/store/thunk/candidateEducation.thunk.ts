import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidateEducationService } from '../../api/services/candidateEducation.service'; // Adjust path
 import { ApiError } from '../../models/types/common';
import { fetchCandidateEducationsFailure, fetchCandidateEducationsStart, fetchCandidateEducationsSuccess } from '../slices/candidateEducation.slice';

 export const fetchCandidateEducations = createAsyncThunk(
  'candidateEducation/fetchCandidateEducations',
  async (_, { dispatch }) => { // No input needed
    try {
      dispatch(fetchCandidateEducationsStart());
      const response = await CandidateEducationService.getCandidateEducations();
      dispatch(fetchCandidateEducationsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidateEducationsFailure(
          apiError.message || 'Failed to fetch candidate educations',
        ),
      );
      throw error;
    }
  },
 );