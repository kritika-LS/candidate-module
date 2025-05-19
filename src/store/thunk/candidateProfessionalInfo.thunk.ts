import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidateProfessionalInfoService } from '../../api/services/candidateProfessionalInfo.service';
 import {
  fetchCandidateProfessionalInfoStart,
  fetchCandidateProfessionalInfoSuccess,
  fetchCandidateProfessionalInfoFailure,
 } from '../slices/candidateProfessionalInfo.slice';
 import { ApiError } from '../../models/types/common';

 export const fetchCandidateProfessionalInformation = createAsyncThunk(
  'candidateProfessionalInfo/fetchCandidateProfessionalInformation',
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
          apiError.message || 'Failed to fetch candidate professional information',
        ),
      );
      throw error;
    }
  },
 );