 import { createAsyncThunk } from '@reduxjs/toolkit';
 import { ScreeningDetailsService } from '../../api/services/screeningDetails.service';
 import {
  fetchScreeningDetailsStart,
  fetchScreeningDetailsSuccess,
  fetchScreeningDetailsFailure,
 } from '../slices/screeningDetails.slice';
 import { ApiError } from '../../models/types/common';

 export const fetchScreeningDetails = createAsyncThunk(
  'screeningDetails/fetch',
  async (candidatePoolId: string, { dispatch }) => {
    try {
      
      dispatch(fetchScreeningDetailsStart());

      const response = await ScreeningDetailsService.getDetails(candidatePoolId);

      dispatch(fetchScreeningDetailsSuccess(response.responsePayload));

      return response;
    } catch (error) {
      
      const apiError = error as ApiError;
      dispatch(fetchScreeningDetailsFailure(apiError.message || `Failed to fetch screening details for ID: ${candidatePoolId}.`));

      throw error;
    }
  }
 );
