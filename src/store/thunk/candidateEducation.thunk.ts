import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateEducationService } from '../../api/services/candidateEducation.service';
import {
  fetchCandidateEducationsStart,
  fetchCandidateEducationsSuccess,
  fetchCandidateEducationsFailure,
  updateCandidateEducationsStart,
  updateCandidateEducationsSuccess,
  updateCandidateEducationsFailure,
} from '../slices/candidateEducation.slice';
import { ApiError } from '../../models/types/common';

export const fetchCandidateEducations = createAsyncThunk(
  'candidateEducation/fetchCandidateEducations',
  async (_, { dispatch }) => {
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

export const updateCandidateEducations = createAsyncThunk(
  'candidateEducation/updateCandidateEducations',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(updateCandidateEducationsStart());
      const response = await CandidateEducationService.updateCandidateEducations(payload);
      dispatch(updateCandidateEducationsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        updateCandidateEducationsFailure(
          apiError.message || 'Failed to update candidate educations',
        ),
      );
      throw error;
    }
  },
);