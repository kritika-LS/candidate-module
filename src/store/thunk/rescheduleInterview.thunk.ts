import { createAsyncThunk } from '@reduxjs/toolkit';
import { InterviewRescheduleService } from '../../api/services/interviewReschedule.service'; // Import the new service
import { RescheduleInterviewRequestBody } from '../../models/types/interviewReschedule'; // Import the request body type
import {
  rescheduleInterviewStart,
  rescheduleInterviewSuccess,
  rescheduleInterviewFailure,
} from '../slices/interviewReschedule.slice';
import { ApiError } from '../../models/types/common';

export const rescheduleInterview = createAsyncThunk(
  'interviewReschedule/reschedule', // Unique action type prefix
  async (payload: RescheduleInterviewRequestBody, { dispatch }) => {
    try {
      dispatch(rescheduleInterviewStart());

      const response = await InterviewRescheduleService.reschedule(payload);

      dispatch(rescheduleInterviewSuccess(response));

      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(rescheduleInterviewFailure(apiError.message || 'Failed to reschedule interview.'));
      throw error;
    }
  }
);
