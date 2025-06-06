 import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidateInterviewScreeningService } from '../../api/services/screeningInterviews.service';
 import {
  fetchScreeningInterviewsStart, // CHANGED: Import renamed actions
  fetchScreeningInterviewsSuccess, // CHANGED: Import renamed actions
  fetchScreeningInterviewsFailure, // CHANGED: Import renamed actions
 } from '../slices/screeningInterviews.slice'; // CHANGED: Import from renamed slice file
 import { ApiError } from '../../models/types/common';
import { FetchCandidateInterviewScreeningRequest } from '../../models/types/screeningInterview';

 /**
  * An async Redux Thunk for fetching candidate interview screening data.
  * It dispatches actions corresponding to the fetch lifecycle (start, success, failure).
  */
 export const fetchScreeningInterviews = createAsyncThunk( // CHANGED: Thunk name
  'screeningInterviews/fetch', // CHANGED: Unique action type prefix for this thunk
  async (payload: FetchCandidateInterviewScreeningRequest, { dispatch }) => {
    try {
      // 1. Dispatch the 'start' action to indicate loading has begun
      dispatch(fetchScreeningInterviewsStart()); // CHANGED: Dispatch renamed action

      // 2. Call the API service to fetch the data
      const response = await CandidateInterviewScreeningService.getScreening(
        payload.pageFrom,
        payload.pageSize
      );

      // 3. Dispatch the 'success' action with the fetched data
      dispatch(fetchScreeningInterviewsSuccess({ // CHANGED: Dispatch renamed action
        items: response.responsePayload,
        totalResults: response.totalResults,
      }));

      // 4. Return the response, which can be used by the calling component (e.g., with .unwrap())
      return response;
    } catch (error) {
      // 5. Handle errors: cast to ApiError and dispatch 'failure' action
      const apiError = error as ApiError;
      dispatch(fetchScreeningInterviewsFailure(apiError.message || 'Failed to fetch screening interviews.')); // CHANGED: Dispatch renamed action and message
      // Re-throw the error so that consuming components can catch it if they use .unwrap()
      throw error;
    }
  }
 );
