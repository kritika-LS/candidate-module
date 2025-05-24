import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateProfessionalInfoService } from '../../api/services/candidateProfessionalInfo.service';
import {
  fetchCandidateProfessionalInfoStart,
  fetchCandidateProfessionalInfoSuccess,
  fetchCandidateProfessionalInfoFailure,
  updateCandidateProfessionalInfoStart,
  updateCandidateProfessionalInfoSuccess,
  updateCandidateProfessionalInfoFailure,
} from '../slices/candidateProfessionalInfo.slice';
import { ApiError } from '../../models/types/common';

export const fetchCandidateProfessionalInfo = createAsyncThunk(
  'candidateProfessionalInfo/fetchCandidateProfessionalInfo',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchCandidateProfessionalInfoStart());
      const response = await CandidateProfessionalInfoService.getCandidateProfessionalInformation();
      dispatch(fetchCandidateProfessionalInfoSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidateProfessionalInfoFailure(
          apiError.message || 'Failed to fetch candidate professional info',
        ),
      );
      throw error;
    }
  },
);

export const updateCandidateProfessionalInfo = createAsyncThunk(
  'candidateProfessionalInfo/updateCandidateProfessionalInfo',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(updateCandidateProfessionalInfoStart());
      const response = await CandidateProfessionalInfoService.updateCandidateProfessionalInformation(payload);
      dispatch(updateCandidateProfessionalInfoSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        updateCandidateProfessionalInfoFailure(
          apiError.message || 'Failed to update candidate professional info',
        ),
      );
      throw error;
    }
  },
);