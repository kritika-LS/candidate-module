import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchScreeningInterviewsStart,
  fetchScreeningInterviewsSuccess,
  fetchScreeningInterviewsFailure,
} from '../slices/screeningInterviewSlice';
import { ScreeningInterviewResponse } from '../../models/types/screeningInterview';
import { screeningInterviewService } from '../../api/services/screeningInterview.service';

export const fetchScreeningInterviews = createAsyncThunk(
  'screeningInterview/fetchScreeningInterviews',
  async ({ page, pageSize }: { page: number; pageSize: number }, { dispatch }) => {
    try {
      dispatch(fetchScreeningInterviewsStart());
      
      const response = await screeningInterviewService.getScreeningInterviews(
        page, 
        pageSize,
      );

      // const data: ScreeningInterviewResponse = await response.json();
      dispatch(fetchJobsSuccess({ jobs: response?.responsePayload || [], pagination }));
            dispatch(setJobsObject(response));
      dispatch(fetchScreeningInterviewsSuccess(data: response?.responsePayload));
      dispatch(fetchScreeningInterviewsSuccess({
        items: response.responsePayload,
        totalResults: response.totalResults,
      }));

      // Return the full response (optional, but useful if component needs it)
      return response;
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch(fetchScreeningInterviewsFailure(errorMessage));
      throw error;
    }
  }
); 