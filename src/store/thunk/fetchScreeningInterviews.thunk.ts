 import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidateInterviewScreeningService } from '../../api/services/screeningInterviews.service';
 import {
  fetchScreeningInterviewsStart,
  fetchScreeningInterviewsSuccess,
  fetchScreeningInterviewsFailure,
 } from '../slices/screeningInterviews.slice';
 import { ApiError } from '../../models/types/common';
import { FetchCandidateInterviewScreeningRequest } from '../../models/types/screeningInterview';

 export const fetchScreeningInterviews = createAsyncThunk(
  'screeningInterviews/fetch',
  async (payload: FetchCandidateInterviewScreeningRequest, { dispatch }) => {
    try {

      dispatch(fetchScreeningInterviewsStart());

      const response = await CandidateInterviewScreeningService.getScreening(
        payload.pageFrom,
        payload.pageSize
      );

      dispatch(fetchScreeningInterviewsSuccess({
        items: response.responsePayload,
        totalResults: response.totalResults,
      }));

      return response;
    } catch (error) {
      
      const apiError = error as ApiError;
      dispatch(fetchScreeningInterviewsFailure(apiError.message || 'Failed to fetch screening interviews.'));
      throw error;
    }
  }
 );
